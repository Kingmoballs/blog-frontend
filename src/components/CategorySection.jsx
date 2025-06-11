import React from 'react';
import '../styles/CategorySection.scss';

export default function CategoriesSection() {

    const categories = ['Tech', 'Lifestyle', 'Fashion', 'Finance', 'Health', 'Education', 'Sport', 'Politics','Music', 'Others'];

    return (
        <section className="categories-section py-5" data-aos="fade-up">
            <div className="container text-center">
                <h2 className="mb-4">Browse by Category</h2>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    {categories.map((category, index) => (
                        <span key={index} className="badge bg-primary px-4 py-2 fs-6 category-badge">
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
