import { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase.config';

/**
 * Custom hook to check token validity, re-authenticate if expired, 
 * fetch live balance, and update Firestore and local state.
 * @param {string} uid - The user's Firestore document ID.
 * @param {string} backendUrl - Your backend API base URL.
 * @param {Function} [triggerOAuthFlow] - Optional callback to launch Deriv OAuth login if token is dead.

*/
export const useDerivBalance = (triggerOAuthFlow) => {
  const backendUrl = 'https://kash.instantpesa.co.ke/new_deriv/web'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null)

  const uid = auth?.currentUser?.uid


  const fetchUserRecordFromDb = async () => {
    const recordRef = doc(db, 'users', uid);
    const snapshot = await getDoc(recordRef);
    if (!snapshot.exists()) throw new Error('User record not found in database');
    return snapshot.data();
  };

  const fetchAndSyncBalance = useCallback(async (isRefresh = false) => {
    if (!uid) return;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // 1. Retrieve current user record & token from Firestore
      let userData = await fetchUserRecordFromDb();
      let accessToken = userData.token;

      if (!accessToken) {
        throw new Error('No active access token available');
      }

      // 2. Request profile and live balance from backend
      let response = await fetch(`${backendUrl}/user-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });

      let data = await response.json();

      // 3. Check for Token Expiration (401 or explicit token error message)
      if (response.status === 401 || (data.message && data.message.toLowerCase().includes('token'))) {
        console.warn('Deriv token expired or invalid. Initiating re-authentication...');

        if (typeof triggerOAuthFlow === 'function') {
          // Launch your OAuth PKCE flow to get a new code and exchange it via /claim-token
          accessToken = await triggerOAuthFlow();
          
          if (!accessToken) {
            throw new Error('Re-authentication cancelled or failed');
          }

          // Retry fetching profile with the brand new access token
          response = await fetch(`${backendUrl}/user-profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
          });
          data = await response.json();
        } else {
          throw new Error('Session expired. Please log in again.');
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch live balance');
      }


      const liveBalance = data.userData?.live_balance 
      const primaryAccount = data.userData || null;

      setBalance(liveBalance)

      // 4. Update Firestore user document with the fresh token and latest details
      const recordRef = doc(db, 'users', uid);
      await updateDoc(recordRef, {
        token: accessToken,
        accountStatus: 'active',
        lastRefreshedAt: new Date().toISOString(),
        balance: liveBalance,
      });

      // 5. Update local unified user state object
      const updatedUserObject = {
        uid,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        derivId: userData.derivId,
        nickname: data.nickname || userData.nickname,
        token: accessToken,
        accountStatus: 'active',
        loginid: data.loginid || '',
        accounts: data.data || [],
        primaryAccount: primaryAccount,
        liveBalance: liveBalance,
        currency: primaryAccount?.currency || 'USD',
      };

   

      setUser(updatedUserObject);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [uid, backendUrl, triggerOAuthFlow]);

  // Initial fetch on mount
  useEffect(() => {
    if (uid) {
      fetchAndSyncBalance(false);
    }
  }, [uid, fetchAndSyncBalance]);

  return {
    user,
    loading,
    refreshing,
    error,
    balance,
    refreshBalance: () => fetchAndSyncBalance(true),
  };
};