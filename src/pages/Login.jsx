import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/Login.scss"

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        
        try{
            const res = await api.post("/auth/login", formData, { withCredentials: true });
            setMessage("Login Successful");
            setFormData({ email: "", password: "" })
            
            // Redirect after short delay
            setTimeout(() => navigate("/"), 1000);
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="container login-container" data-aos="zoom-in">
            <div className="card p-4 shadow">
                <h2 className="mb-4">Login</h2>
                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Don’t have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    )
}