import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const logoImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/3dcd9b3b1_Diseosinttulo4.png";

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fe-eterna-dark") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("fe-eterna-dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      {/* Floating logo bottom-left */}
      <Link to="/" className="fixed bottom-5 left-5 z-50 drop-shadow-xl hover:scale-110 transition-transform duration-200">
        <img src={logoImg} alt="Fe Eterna" className="w-12 h-12 object-contain" />
      </Link>
    </div>
  );
}