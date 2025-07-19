import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const[user,setUser]=useState(null)
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  };
  const updateUser=(updatedData)=>{
    setLoading(true)
    return updateProfile(auth.currentUser,updatedData)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
        console.log("User logged in:", currentUser);
      } else {
        setUser(null);
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  const AuthInfo = {

    user,
    loading,
    setLoading,
    setUser,
    createUser,
    userLogin,
    googleLogin,
    logOut,
    updateUser,
  };
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;
