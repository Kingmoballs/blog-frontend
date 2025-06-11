import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/RecentPosts.scss";

export default function RecentPosts() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get("/posts");
                setPosts(res.data.reverse().slice(0, 3))
            }
            catch (err) {
                console.error("Failed to fetch posts", err)
            }
        };
        fetchPost();
    }, [])
    return (
        <section className="recent-posts py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-4">Recent Posts</h2>
                <div className="row">
                    {posts.length === 0 ? (
                        <p className="text-center">No posts available yet.</p>
                    ) : (
                        posts.map(post => (
                            <div className="col-md-4 mb-4" key={post._id} data-aos="fade-up">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text flex-grow-1">
                                            {post.content.slice(0, 100)}...
                                        </p>
                                        <small className="text-muted">By {post.author.name || "Unknown"}</small>
                                        <Link to={`/posts/${post._id}`} className="btn btn-primary mt-3 align-self-start">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
