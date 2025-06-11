import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.scss";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage("");
            setLoading(true)
            try {
                const res = await api.post("/auth/register", formData);
                setMessage(res.data.message || "Registration successful!");
                setFormData({ name: "", email: "", password: "" });

                // Redirect to login after a short delay (optional)
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } 
            catch (err) {
                setMessage(err.response?.data?.message || "Registration failed");
            }
            finally {
                setLoading(false)
            }
    };

  return (
    <div className="register-page d-flex justify-content-center align-items-center" data-aos="fade-up">
        <div className="register-form-container shadow p-4 bg-white rounded">
            <h2 className="mb-3 text-center">Create an Account</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter a valid email"
                    required
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
                            value={formData.password}
                            onChange={handleChange}
                            required
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
                    {loading ? 'Registering...' : 'Register'}
                </button>

            </form>
            <div className="mt-3 text-center">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
    </div>
  );
}
