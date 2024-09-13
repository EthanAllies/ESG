import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [dbUser, setDBUser] = useState({email: "", displayName: "", score: 0, badges:[]});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function getUser() {
    const httpResponse = await axios.get("http://localhost:3000/user/" + currentUser.email)
    const user = httpResponse.data;
    if (user == null) {
      await axios.post("http://localhost:3000/user", {
        displayName: currentUser.displayName,
        email: currentUser.email,
        score: 0,
        badges: []

      })
      return getUser()
    }

    setDBUser(user);
  }

  

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      logout,
      dbUser,
      getUser,
      setDBUser
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};