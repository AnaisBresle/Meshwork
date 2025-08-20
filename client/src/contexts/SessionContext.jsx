import React, { createContext, useState, useEffect, useContext } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

   useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (!user) {
      login(
        {
          firstname: "Anais",
          lastname: "Doe",
          username: "anais123",
          profile: { picture: "/profile/userId-1.jpg" } // public folder
        },
        "dummy-token"
      );
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);


