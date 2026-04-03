import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, Sun, Moon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";

const logoImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/3dcd9b3b1_Diseosinttulo4.png";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      }
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Inicio", path: "/" },
    { label: "Cursos", path: "/cursos" },
    { label: "Música", path: "/musica" },
    { label: "Donación", path: "/donacion" },
  ];

  const isActive = (path) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-2xl"
          : ""
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(90deg, rgba(10,40,90,0.97) 0%, rgba(20,100,140,0.97) 35%, rgba(60,30,120,0.97) 70%, rgba(10,40,90,0.97) 100%)"
          : "linear-gradient(90deg, rgba(10,40,90,0.85) 0%, rgba(20,100,140,0.85) 35%, rgba(60,30,120,0.85) 70%, rgba(10,40,90,0.85) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img
              src={logoImg}
              alt="Fe Eterna"
              className="w-9 h-9 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="font-heading text-xl font-bold text-white tracking-wide hidden sm:block">
              Fe Eterna
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              title={darkMode ? "Modo claro" : "Modo oscuro"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/80">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium max-w-[120px] truncate">{user.full_name || user.email}</span>
                </div>
                <button
                  onClick={() => base44.auth.logout()}
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => base44.auth.redirectToLogin()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50" }}
              >
                <LogIn className="w-3.5 h-3.5" />
                Iniciar sesión
              </motion.button>
            )}
          </div>

          {/* Mobile: dark mode + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white/70 hover:text-white transition-all"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(10,30,80,0.97)", backdropFilter: "blur(20px)" }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                {user ? (
                  <div className="space-y-1">
                    <p className="px-4 py-2 text-xs text-white/50">{user.full_name || user.email}</p>
                    <button
                      onClick={() => base44.auth.logout()}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/8 hover:text-white transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => base44.auth.redirectToLogin()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all mt-1"
                    style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50" }}
                  >
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}