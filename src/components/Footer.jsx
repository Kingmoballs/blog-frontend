import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.scss";

export default function Footer() {
    return (
        <footer className="footer-section text-white mt-5" >
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h5 className="footer-logo">MyBlog</h5>
                        <p>Write. Read. Connect. Empower voices across the world.</p>
                    </div>

                    <div className="col-md-3 mb-3 mb-md-0">
                        <h6>Quick Links</h6>
                        <ul className="list-unstyled">
                        <li><Link to="/" className="footer-link">Home</Link></li>
                        <li><Link to="/create" className="footer-link">Create Post</Link></li>
                        <li><Link to="/login" className="footer-link">Login</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h6>Follow Us</h6>
                        <div className="social-icons">
                        <a href="https://www.twitter.com" className="footer-icon"><i className="fab fa-twitter"></i></a>
                        <a href="https://github.com/Kingmoballs" className="footer-icon"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/samuel-mobolaji/" className="footer-icon"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                <hr className="bg-light" />
                <div className="text-center small">
                    &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
