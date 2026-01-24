import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";
export const AuthContext = createContext();

function AuthProviderContent({ children }) {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
          // Validar token com a API
          const response = await axios.get(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user || JSON.parse(savedUser));
        }
      } catch (error) {
        // Token inválido ou expirado
        console.error("Erro ao restaurar sessão:", error.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    if (!loginData) return;

    async function signIn() {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/login`, loginData);
        const userData = response.data.user;
        const token = response.data.token;
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setError(null);
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        setError(error.response?.data?.message || error.message);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoading(false);
      }
    }
    signIn();
    setLoginData(null);
  }, [loginData, navigate]);

  function login(email, password) {
    setError(null);
    setLoginData({ email, password });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  return (
    <AuthProviderContent>
      {children}
    </AuthProviderContent>
  );
}
