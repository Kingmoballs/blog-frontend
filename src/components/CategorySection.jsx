import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategorySection.scss';

export default function CategoriesSection() {
    const categories = [
        'Tech', 'Lifestyle', 'Fashion', 'Finance', 'Health',
        'Education', 'Sport', 'Politics', 'Music', 'Others'
    ];

    return (
        <section className="categories-section py-5" data-aos="fade-up">
            <div className="container text-center">
                <h2 className="mb-4">Browse by Category</h2>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/posts?category=${encodeURIComponent(category)}`}
                            className="badge bg-primary px-4 py-2 fs-6 category-badge text-decoration-none"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
