import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/SinglePost.scss";

export default function SinglePost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchPost();
        fetchCurrentUser();
    }, []);

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
        } catch (err) {
            console.error("Error fetching post:", err);
            setError("Post not found or error loading post.");
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (err) {
            console.warn("User not logged in");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/posts/${id}`);
                navigate("/posts");
            } catch (err) {
                console.error("Error deleting post:", err);
                alert("Failed to delete post.");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const isAuthor = user && post && post.author?._id === user._id;

    if (error) {
        return <div className="container py-5 text-center text-danger">{error}</div>;
    }

    if (!post) {
        return <div className="container py-5 text-center">Loading post...</div>;
    }

    return (
        <div className="container py-5 single-post">
            <h2 className="mb-3">{post.title}</h2>
            <p className="text-muted mb-2">
                Category: <strong>{post.category || "Uncategorized"}</strong>
            </p>
            <p className="text-muted">By {post.author?.name || "Unknown Author"}</p>

            {isAuthor && (
                <div className="mb-3">
                    <button className="btn btn-sm btn-primary me-2" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            )}

            <hr />
            <div className="post-content mt-4">{post.content}</div>
        </div>
    );
}
