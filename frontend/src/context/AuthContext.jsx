import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  getAdminSession,
  loginAdmin,
  logoutAdmin,
} from "../services/authService";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    return getAdminSession();
  });

  const login = useCallback(
    async (username, password) => {
      const session = await loginAdmin(
        username,
        password
      );

      setAdmin(session);

      return session;
    },
    []
  );

  const logout = useCallback(() => {
    logoutAdmin();
    setAdmin(null);
  }, []);

  const authValue = useMemo(() => {
    return {
      admin,
      isAuthenticated: Boolean(admin),
      login,
      logout,
    };
  }, [admin, login, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}

export {
  AuthProvider,
  useAuth,
};