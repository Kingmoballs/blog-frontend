import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/CreatePost.scss";

const categories = [
  'Tech', 'Lifestyle', 'Fashion', 'Finance', 'Health',
  'Education', 'Sport', 'Politics', 'Music', 'Others'
];

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({ title: "", content: "", category: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setPost({
                    title: res.data.title,
                    content: res.data.content,
                    category: res.data.category
                });
            } catch (err) {
                console.error("Failed to fetch post", err);
                setError("Failed to load post or unauthorized access.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await api.put(`/posts/${id}`, post);
            navigate(`/posts/${id}`);
        } catch (err) {
            console.error("Failed to update post", err);
            setError("Failed to update post");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container py-5 text-center">Loading post...</div>;
    if (error) return <div className="container py-5 text-danger text-center">{error}</div>;

    return (
        <div className="container py-5 create-post">
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        className="form-control"
                        rows="8"
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label>Category</label>
                    <select
                        name="category"
                        value={post.category}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
}
