import { createContext, useContext, useState, ReactNode } from "react";
import { DemoUser } from "../data/mockData";

interface AuthContextValue {
  user: DemoUser | null;
  login: (user: DemoUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const login = (u: DemoUser) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth csak AuthProvider-en belül hasznalhato");
  return ctx;
}
