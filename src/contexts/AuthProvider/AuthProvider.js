import React, { useState, createContext, useEffect,  } from 'react';
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from './../../firebase/firebase.config';

export const AuthContext = createContext();
const auth= getAuth(app);
const AuthProvider = ({children}) => {

    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //login
    const login=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        localStorage.removeItem('Genius-token')
        return signOut(auth)
    }
    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth, (currentUser)=>{
         console.log(currentUser);
         setUser(currentUser)
         setLoading(false);
        });
 return ()=>{
    return unSubscribe();
 }
    },[])

    const authInfo ={user,loading,createUser,login,logOut};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;