import React from "react";
import { Link } from "react-router-dom";
import "../styles/CallToAction.scss";

export default function CallToAction() {
    return (
        <section className="cta-section text-center text-white" data-aos="fade-up">
            <div className="container py-5">
                <h2 className="cta-heading mb-3">Join Our Community of Thinkers & Creators</h2>
                <p className="cta-subtext mb-4">
                    Share your stories, explore insightful posts, and connect with like-minded individuals.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/register" className="btn btn-outline-light px-4">
                        Get Started
                    </Link>
                    <Link to="/posts" className="btn btn-light px-4 text-dark">
                        Browse Posts
                    </Link>
                </div>
            </div>
        </section>
    );
}
