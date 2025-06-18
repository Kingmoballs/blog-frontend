import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile"

import AOS from 'aos';
import 'aos/dist/aos.css';



function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,
      once: true, 
      mirror: false,

    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/posts" element={ <Posts /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/posts/:id" element={ <SinglePost /> } />
        <Route path="/create" element={ <CreatePost /> } />
        <Route path="/edit/:id" element={ <EditPost /> } />
      </Routes>
    </Router>
  );
}

export default App;
