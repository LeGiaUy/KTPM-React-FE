import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ktpm_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("ktpm_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("ktpm_user");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}


