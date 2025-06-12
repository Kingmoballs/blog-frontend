import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePost.scss";

export default function CreatePost() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Tech",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const categories = [
        "Tech",
        "Lifestyle",
        "Fashion",
        "Finance",
        "Health",
        "Education",
        "Sport",
        "Politics",
        "Music",
        "Others",
    ];

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            await api.post("/posts", formData, {
                withCredentials: true,
            });
            setMessage("Post created successfully!");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container create-post-container" data-aos="fade-up">
            <div className="card shadow">
                <h2>Create New Post</h2>
                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            rows="6"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                                ></span>
                                Publishing...
                            </>
                        ) : (
                            "Publish Post"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
