import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import api from "../services/api";
import "../styles/Profile.scss";

export default function ProfileSettingsPage() {
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/auth/me', { withCredentials: true });
                setUser(userRes.data);

                const postRes = await api.get("/posts/myposts", { withCredentials: true });
                setUserPosts(postRes.data);
            } catch (error) {
                console.error('Error fetching profile or posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error text-danger">{error}</div>;


    return (
        <div className="profile-settings container py-5">
            <div className="row g-4">
                {/* Profile Card */}
                <div className="col-lg-4">
                    <div className="card profile-card shadow rounded-4 p-4">
                        <div className="text-center">
                            <h4>{user.name}</h4>
                            <p className="text-muted">{user.email}</p>
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-outline-primary w-100 mb-2">Edit Profile</button>
                            <button className="btn btn-outline-danger w-100">Logout</button>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="col-lg-8">
                    <div className="card shadow rounded-4 p-4">
                        <h5 className="mb-3">Your Posts</h5>
                        {userPosts.length === 0 ? (
                            <p className="text-muted">You haven't written any posts yet.</p>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                                    <li key={post._id} className="list-group-item list-group-item-action">
                                        <Link
                                            to={`/posts/${post._id}`}
                                            className="text-decoration-none text-dark d-block"
                                        >
                                            <h6 className="mb-1">{post.title}</h6>
                                            <p className="text-muted small mb-0">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
