import { useState, useCallback } from 'react';

// Adjust this import based on your environment (e.g., localStorage for Web or AsyncStorage for React Native)
const TOKEN_KEY = 'deriv_access_token';

export const useDerivAuth = (backendUrl) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to persist/retrieve local token
  const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
  const saveToken = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  // 1. Fetch Auth URL to launch OAuth flow (WebView / Browser)
  const getAuthUrl = useCallback(async (refCode = '') => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${backendUrl}/auth-url?ref=${encodeURIComponent(refCode)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to get Auth URL');
      return data; // returns { authUrl, state }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // 2. Exchange authorization code for access token
  const claimToken = useCallback(async (code, state) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${backendUrl}/claim-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
      });
      const data = await res.json();

      if (!res.ok || !data.accessToken) {
        throw new Error(data.message || 'Token exchange failed');
      }

      saveToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // 3. Fetch user profile & CR accounts
  const fetchUserProfile = useCallback(async (accessToken) => {
    const activeToken = accessToken || getStoredToken();
    if (!activeToken) return null;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${backendUrl}/user-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: activeToken }),
      });
      const data = await res.json();
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // 4. Pre-withdrawal Token Check & Reauthentication Guard
  const prepareForWithdrawal = async (targetCrAccount) => {
    setLoading(true);
    setError(null);

    const existingToken = getStoredToken();

    // Case A: No token stored → Must reauthenticate
    if (!existingToken) {
      setLoading(false);
      return { ok: false, reason: 'NO_TOKEN', authUrlData: await getAuthUrl() };
    }

    // Case B: Token exists → Verify token against active CR account scope
    try {
      const verifyRes = await fetch(`${backendUrl}/verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cr: targetCrAccount, accessToken: existingToken }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.valid) {
        setToken(existingToken);
        setLoading(false);
        return { ok: true, accessToken: existingToken, accountData: verifyData };
      }

      // Token invalid/expired or account mismatch → Reauthenticate
      const authUrlData = await getAuthUrl();
      setLoading(false);
      return { ok: false, reason: 'TOKEN_INVALID', authUrlData };
    } catch (err) {
      setLoading(false);
      setError('Verification network error');
      return { ok: false, reason: 'NETWORK_ERROR', error: err.message };
    }
  };

  return {
    token,
    profile,
    loading,
    error,
    getAuthUrl,
    claimToken,
    fetchUserProfile,
    prepareForWithdrawal,
  };
};