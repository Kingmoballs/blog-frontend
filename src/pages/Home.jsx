import React from "react";
import "../styles/Home.scss";
import HeroSection from '../components/HeroSection';
import RecentPosts from '../components/RecentPosts';
import AboutSection from "../components/AboutSection";
import CategorySection from "../components/CategorySection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <RecentPosts />
            <AboutSection />
            <CategorySection />
            <CallToAction />
            <Footer />
        </div>
    )
}