import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { useDispatch } from "react-redux";
import { setUser, clearUser, setAvatar } from "../store/authSlice";
import {
  loadFavorites,
  mergeFavoritesOnLogin,
} from "../store/favoritesSlice";

import { loadUserProfile } from "../services/profileService"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      
      if (firebaseUser) {

        
        const safeUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || null,
        };

        dispatch(setUser(safeUser));

        
        const profile = await loadUserProfile(firebaseUser.uid);

if (profile?.avatarUrl) {
  const finalUrl = profile.version
    ? `${profile.avatarUrl}?v=${profile.version}`
    : profile.avatarUrl;

  dispatch(setAvatar(finalUrl));
}

      
        await dispatch(mergeFavoritesOnLogin(firebaseUser));
        await dispatch(loadFavorites(firebaseUser));

      } else {
        dispatch(clearUser());
        await dispatch(loadFavorites(null));
      }

      setLoading(false);
    });

    return unsubscribe; 
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
