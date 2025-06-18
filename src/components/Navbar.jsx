import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "../styles/Navbar.scss";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, fetchUser } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);


    const handleLogout = async () => {
        try {
            await api.post("/auth/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">MyBlog</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create Post</Link>
                        </li>

                        {user ? (
                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <FaUserCircle size={24} className="me-1" />
                                </span>
                                {showDropdown && (
                                    <ul className="dropdown-menu dropdown-menu-end show">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">Profile & Settings</Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
