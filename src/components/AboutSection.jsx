import React from "react";
import "../styles/AboutSection.scss";
import aboutImg from "../assets/about-blog.png"; // Use your own image or SVG

export default function AboutSection() {
  return (
    <section className="about-section py-5" id="about">

        <div className="container">
            <div className="row align-items-center">
                <div
                    className="col-md-6"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    <img src={aboutImg} alt="About the blog" className="img-fluid rounded shadow" />
                </div>
                <div
                    className="col-md-6"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <h2 className="mb-4">About This Blog</h2>
                    <p className="lead">
                        Welcome to <strong>MyBlog</strong>, a space where ideas, creativity, and knowledge come alive.
                        Whether you're here to read, learn, or share, this platform is built with passion and purpose.
                    </p>
                    <p>
                        We believe everyone has a story worth telling. From coding tutorials to personal insights, our mission is to amplify voices and create a thriving community of writers and readers.
                    </p>
                    <button className="btn btn-outline-dark mt-3">Join the Community</button>
                </div>
            </div>
        </div>
    </section>
  );
}
