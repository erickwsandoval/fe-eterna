import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Calendar, Tag, Instagram } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const categoryColors = {
  Noticias: { bg: "rgba(26,110,176,0.12)", color: "#1a6eb0" },
  Reflexiones: { bg: "rgba(124,58,237,0.12)", color: "#7c3aed" },
  Eventos: { bg: "rgba(212,160,23,0.12)", color: "#d4a017" },
  Anuncios: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
};

function BlogCard({ post, index }) {
  const cat = categoryColors[post.category] || categoryColors["Noticias"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {post.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: cat.bg, color: cat.color }}>
            {post.category || "Noticias"}
          </span>
          {post.created_date && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          )}
        </div>
        <h3 className="font-heading font-bold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.summary}</p>
      </div>
    </motion.div>
  );
}

function InstagramWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
          <Instagram className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">@fe.eternamedia</p>
          <p className="text-xs text-muted-foreground">Última publicación</p>
        </div>
        <a
          href="https://www.instagram.com/fe.eternamedia/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold transition-colors hover:underline"
          style={{ color: "#dc2743" }}
        >
          Ver perfil →
        </a>
      </div>
      {/* Embedded feed */}
      <div className="relative w-full" style={{ minHeight: 420 }}>
        <iframe
          src="https://www.instagram.com/fe.eternamedia/embed"
          className="w-full"
          style={{ height: 420, border: "none" }}
          scrolling="no"
          allowTransparency="true"
          title="Instagram Fe Eterna"
        />
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date", 3).then(setPosts).catch(() => {});
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Newspaper className="w-5 h-5 text-accent" />
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Comunidad</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Noticias y Redes</h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-20 h-1 mx-auto mt-4 rounded-full"
          style={{ background: "linear-gradient(90deg, #1a6eb0, #7c3aed)" }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog posts */}
        <div className="lg:col-span-2">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-border text-center px-6"
            >
              <Newspaper className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">Próximamente publicaciones</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Las noticias y novedades aparecerán aquí</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Instagram widget */}
        <div className="lg:col-span-1">
          <InstagramWidget />
        </div>
      </div>
    </section>
  );
}