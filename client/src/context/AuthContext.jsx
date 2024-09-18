import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import config from "../config.json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [dbUser, setDBUser] = useState({
    email: "",
    displayName: "",
    scores: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function getUser() {
    const httpResponse = await axios.get(
      `${config.api_url}/user/${currentUser.email}`
    );
    const user = httpResponse.data;
    if (user == null) {
      await axios.post(`${config.api_url}/user`, {
        displayName: currentUser.displayName,
        email: currentUser.email,
        scores: [
          {
            quiz_id: "1",
            score: 0,
          },
          {
            quiz_id: "2",
            score: 0,
          },
          {
            quiz_id: "3",
            score: 0,
          },
          {
            quiz_id: "4",
            score: 0,
          },
          {
            quiz_id: "5",
            score: 0,
          },
          {
            quiz_id: "6",
            score: 0,
          },
          {
            quiz_id: "7",
            score: 0,
          },
          {
            quiz_id: "8",
            score: 0,
          },
          {
            quiz_id: "9",
            score: 0,
          },
        ],
      });
      return getUser();
    }

    setDBUser(user);
  }

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        dbUser,
        getUser,
        setDBUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
