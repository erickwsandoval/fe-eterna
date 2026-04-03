import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Music, Heart, MessageSquare, FileText, Video, GraduationCap, Users, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BlogSection from "@/components/home/BlogSection";

const logoImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/3dcd9b3b1_Diseosinttulo4.png";
const heavenImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/5432d6937_generated_image.png";
const coursesImg = "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80";
const musicImg = heavenImg;
const donationImg = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80";
const reflectionsImg = heavenImg;
const articlesImg = "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80";
const videosImg = heavenImg;
const missionaryImg = heavenImg;
const communityImg = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80";
const testimoniesImg = heavenImg;

const sections = [
  { title: "Cursos Bíblicos", description: "Profundiza en la Palabra de Dios con estudios guiados", image: coursesImg, path: "/cursos", icon: BookOpen, color: "from-blue-600/80 to-indigo-800/80" },
  { title: "Música", description: "Alabanzas y adoración para elevar tu espíritu", image: musicImg, path: "/musica", icon: Music, color: "from-purple-600/80 to-pink-700/80" },
  { title: "Reflexiones", description: "Meditaciones diarias para fortalecer tu fe", image: reflectionsImg, comingSoon: true, icon: MessageSquare, color: "from-teal-600/80 to-cyan-700/80" },
  { title: "Artículos", description: "Lecturas edificantes para tu crecimiento espiritual", image: articlesImg, comingSoon: true, icon: FileText, color: "from-emerald-600/80 to-green-800/80" },
  { title: "Videos", description: "Contenido audiovisual para aprender y crecer", image: videosImg, comingSoon: true, icon: Video, color: "from-rose-600/80 to-red-800/80" },
  { title: "Donar", description: "Apoya esta misión con tu generosidad", image: donationImg, path: "/donacion", icon: Heart, color: "from-amber-500/80 to-orange-700/80" },
  { title: "Escuela Misionera", description: "Formación integral para servir al mundo", image: missionaryImg, comingSoon: true, icon: GraduationCap, color: "from-sky-600/80 to-blue-800/80" },
  { title: "Comunidad", description: "Conéctate con hermanos de todo el mundo", image: communityImg, comingSoon: true, icon: Users, color: "from-violet-600/80 to-purple-800/80" },
  { title: "Testimonios", description: "Historias que inspiran y fortalecen la fe", image: testimoniesImg, comingSoon: true, icon: Star, color: "from-yellow-500/80 to-amber-700/80" },
];

function SectionCard({ title, description, image, path, comingSoon, icon: Icon, color, index }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={!comingSoon ? { y: -6, scale: 1.02 } : {}}
      className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ${comingSoon ? "opacity-70" : "cursor-pointer"}`}
    >
      {/* Background image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
        {/* Glass bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-sm leading-tight">{title}</h3>
                <p className="text-white/70 text-xs line-clamp-1">{description}</p>
              </div>
            </div>
            {comingSoon ? (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                Pronto
              </span>
            ) : (
              <div className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors" style={{ background: "rgba(255,255,255,0.15)" }}>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (comingSoon) return content;
  return <Link to={path}>{content}</Link>;
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <img src="https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/5eb614af9_generated_image.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Animated background overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,31,92,0.82) 0%, rgba(13,59,110,0.75) 25%, rgba(26,58,143,0.72) 50%, rgba(59,31,122,0.78) 75%, rgba(10,31,92,0.85) 100%)" }} />
        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,110,200,0.35) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 70%)", filter: "blur(30px)" }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: "rgba(212,160,23,0.3)", transform: "scale(1.5)" }} />
              <img src={logoImg} alt="Fe Eterna" className="relative w-48 md:w-64 drop-shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-32 h-0.5 mx-auto mb-6 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #d4a017, transparent)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/90 text-2xl md:text-3xl font-light tracking-[0.3em] uppercase font-heading"
            >
              VOLVAMOS AL PRINCIPIO
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/50 mt-4 text-base md:text-lg max-w-md"
            >
              Una plataforma educativa cristiana para crecer en la fe
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 mt-10 justify-center"
            >
              <Link to="/cursos">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50", boxShadow: "0 8px 30px rgba(212,160,23,0.4)" }}
                >
                  <BookOpen className="w-4 h-4" />
                  Comenzar estudios
                </motion.button>
              </Link>
              <Link to="/musica">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }}
                >
                  <Music className="w-4 h-4" />
                  Escuchar música
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "linear-gradient(90deg, #0a2060 0%, #1a3a8f 50%, #0a2060 100%)" }} className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Lecciones", value: "20+" },
              { label: "Canciones", value: "6" },
              { label: "Secciones", value: "9" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4 py-2"
              >
                <p className="text-2xl font-bold text-white font-heading">{s.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Explora</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Lo más visitado
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #1a6eb0, #7c3aed)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => (
            <SectionCard key={section.title} {...section} index={i} />
          ))}
        </div>
      </section>

      {/* Blog & Instagram */}
      <BlogSection />

      {/* CTA Banner */}
      <section className="mx-4 md:mx-8 lg:mx-16 mb-16 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a2060 0%, #3b1f7a 50%, #1a4060 100%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,160,23,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(124,58,237,0.5) 0%, transparent 50%)" }} />
        <div className="relative z-10 text-center py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              Empieza tu camino hoy
            </h3>
            <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
              Comienza con el curso "Volviendo al Principio" y transforma tu vida en la fe
            </p>
            <Link to="/cursos/volviendo-al-principio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-2xl font-bold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50", boxShadow: "0 10px 40px rgba(212,160,23,0.4)" }}
              >
                Ir al curso →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}