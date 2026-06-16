import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContext";
import apiClient from "../api/axiosClient";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.post("/users/refresh-token");
        const { user: freshUser, accessToken } = response.data.data;
        
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        
        const finalUser = freshUser || JSON.parse(storedUser);
        localStorage.setItem("user", JSON.stringify(finalUser));
        setUser(finalUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Session restoration failed, clearing storage:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = async (email, password) => {
    const response = await apiClient.post("/users/login", { email, password });
    const { user, accessToken } = response.data.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);

    setUser(user);
    setIsLoggedIn(true);
    return response.data.data;
  };

  const logout = async () => {
    try {
      await apiClient.post("/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    setUser,
    setIsLoggedIn,
    refreshUser: restoreSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
