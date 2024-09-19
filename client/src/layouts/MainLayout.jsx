import React, { useEffect } from 'react'
import SideBar from "../components/AppSidebar" // Importing the sidebar component
import { Outlet } from 'react-router-dom' // Outlet is a placeholder for nested routes
import { useAuth } from "../context/AuthContext"; // Custom hook for authentication context
import { auth, googleProvider } from "../firebase"; // Importing Firebase auth and Google provider
import { signInWithPopup } from "firebase/auth"; // Function to handle Google sign-in via popup
import axios from 'axios'; // Importing axios for HTTP requests (if needed)

export default function MainLayout() {

  const { currentUser, logout, setDBUser, getUser } = useAuth(); // Extracting auth-related functions from context

  // Function to handle Google sign-in
  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider); // Sign in with Google using Firebase popup
    } catch (error) {
      console.error("Error signing in with Google", error); // Log error if sign-in fails
    }
  };

  // Function to check if the user is authenticated and update state accordingly
  async function onAuthChange() {
    if (currentUser != null) {
      getUser() // Fetch user details if logged in
    } else {
      setDBUser({ email: "", displayName: "" }) // Set default (empty) user details if not logged in
    }
  }

  // useEffect to listen for changes in the currentUser and call onAuthChange when it updates
  useEffect(() => {
    onAuthChange()
  }, [currentUser]) // Dependency array: runs effect whenever currentUser changes

  return (
    <div className='flex flex-row overflow-hidden '>
      {/* Layout with Sidebar and main content area */}
      <SideBar /> {/* Rendering the Sidebar component */}
      <div className='flex flex-col w-screen h-screen '>
        {/* Top bar with sign-in/out button */}
        <div className=' h-[60px] flex items-center justify-end px-4  '>
          {currentUser ? (
            // If the user is signed in, show the Logout button
            <button onClick={logout} className='btn-signup'>Log Out</button>
          ) : (
            // If the user is not signed in, show the Sign in button
            <button onClick={handleGoogleSignIn} className='btn-signup'>Sign in</button>
          )}
        </div>
        {/* Main content area, rendered through the Outlet (nested routes) */}
        <div className='h-[calc(100%-60px)] overflow-y-auto'>
          <Outlet /> {/* Placeholder for child components of the current route */}
        </div>
      </div>
    </div>
  )
}
