// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me", { withCredentials: true });
            setUser(res.data);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser(); // check user on app load
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
