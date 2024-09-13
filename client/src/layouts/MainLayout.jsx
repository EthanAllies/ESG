import React, { useEffect } from 'react'
import SideBar from "../components/AppSidebar"
import { Outlet } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from 'axios';

export default function MainLayout() {

  const { currentUser, logout, setDBUser, getUser } = useAuth();

  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider); // Sign in with Google
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  async function onAuthChange() {
    if (currentUser != null) {
      getUser()
    } else {
      setDBUser({email:"", displayName: ""})
    }

  }



  useEffect(() => {
    onAuthChange()
  }, [currentUser])

  return (
    <div className='flex flex-row overflow-hidden '>
      <SideBar />
      <div className='flex flex-col w-screen h-screen '>
        <div className=' h-[60px] flex items-center justify-end px-4  '>
          {currentUser ?
            <button onClick={logout} className='btn-signup'>Log Out</button> :
            <button onClick={handleGoogleSignIn} className='btn-signup'>Sign in</button>}
          {currentUser ? <div>{currentUser.displayName}</div> : null}
          {currentUser ? <div>{currentUser.email}</div> : null}
          {currentUser ? <img src={currentUser.photoURL} className='h-[20px] w-[20px] rounded-full' /> : null}
        </div>
        <div className='h-[calc(100%-60px)] overflow-y-auto'>
          <Outlet />
        </div>

      </div>
    </div>
  )

}