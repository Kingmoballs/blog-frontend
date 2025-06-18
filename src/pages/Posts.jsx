import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Posts.scss";
import { Link, useSearchParams } from "react-router-dom";

const categories = [
    "All",
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

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "All";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/posts");
                setPosts(res.data || []);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.category === selectedCategory));
        }
    }, [selectedCategory, posts]);


    const handleCategoryClick = (category) => {
        if (category === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    return (
        <div className="posts-page container py-5">
            <h2 className="text-center mb-4">All Blog Posts</h2>

            {/* Category Buttons */}
            <div className="mb-4 text-center category-buttons">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`btn btn-outline-dark btn-sm mx-1 ${selectedCategory === cat ? "active" : ""}`}
                        onClick={() => handleCategoryClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="row">
                {filteredPosts.length > 0 ? (
                    [...filteredPosts]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post) => (
                        <div
                            key={post._id}
                            className="col-md-6 col-lg-4 mb-4"
                            data-aos="fade-up"
                        >
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">
                                        {post.content.substring(0, 100)}...
                                    </p>
                                    <p className="card-meta text-muted">
                                        Category: {post.category || "Uncategorized"}
                                    </p>
                                    <Link to={`/posts/${post._id}`} className="btn btn-dark btn-sm">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No posts found in this category.</p>
                )}
            </div>
        </div>
    );
}
