import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase.config";
import { getUserByEmail } from "@/firebase/FirebaseUser";
import { useInternetStatus } from "@/hooks/useInternetStatus";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false)
  const [verifyModal, setVerifyModal] = useState(false)
  const [isDepositModelOpen, setIsDepositModelOpen] = useState(false)
  const [isWithdrawModelOpen, setIsWithdrawModelOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState({});
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false)

  const isOnline = useInternetStatus()


  // get user profile
  const [finishAccount, setFinishAccount] = useState(() => {
    if (typeof window !== 'undefined') { 
        const storedValue = localStorage.getItem("finishaccount");
        return storedValue ? JSON.parse(storedValue) : { isProfile: false };
    }
    return { isProfile: false }; 
});

  useEffect(() => {
    if(!isOnline) return
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(typeof window === 'undefined') return
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
  
        try {
          const profile = await getUserByEmail(user?.email);
          if (profile) {
            setUserProfile(profile);
          } else {
            const finishAccountData = { isProfile: true };
            localStorage.setItem("finishaccount", JSON.stringify(finishAccountData));
            setFinishAccount(finishAccountData); // Sync with state
          }
        } catch (error) {
          console.error("Error fetching user profile: ", error.message);
          
        }
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("finishaccount");
        setUser({});
        setUserProfile({});
        setFinishAccount({ isProfile: false }); // Reset state
      }
    });
  
    return unsubscribe;
  }, []);





  // Determine if a user is authenticated
  const isUser = user !== null && user && Object.keys(user).length > 0;
  const isUserProfile = userProfile !== null && user ;


  const data = {
    user,
    setUser,
    isUser,
    isUserProfile,
    userProfile,
    setUserProfile,
    finishAccount,
    successAlert, 
    setSuccessAlert,
    verifyModal,
    setVerifyModal,
    isDepositModelOpen, 
    setIsDepositModelOpen,
    isWithdrawModelOpen, 
    setIsWithdrawModelOpen,
    refreshing, 
    setRefreshing,
    notification, setNotification,
    openSuccessAlert, setOpenSuccessAlert
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContext;