import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.scss';

export default function HeroSection() {
  return (
    <section className="hero-section d-flex align-items-center" data-aos="fade-up">
      <div className="container text-center text-white">
            <h1 className="display-4 fw-bold">Welcome to MyBlog</h1>
            <p className="lead">Share your thoughts, inspire the world.</p>
            <Link to="/posts" className="btn btn-light btn-lg mt-3">Explore Posts</Link>
      </div>
    </section>
  );
}
