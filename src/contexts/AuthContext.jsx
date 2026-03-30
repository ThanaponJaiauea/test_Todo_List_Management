"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authenticateUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setAuthenticatedUser(data.user);
          } else {
            removeAccessToken();
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAuthUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setAccessToken(data.accessToken);
      const resMe = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      const dataMe = await resMe.json();
      setAuthenticatedUser(dataMe.user);
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    removeAccessToken();
    setAuthenticatedUser(null);
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ authenticateUser, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
