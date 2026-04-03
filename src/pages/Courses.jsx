import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Lock, ArrowRight, Layers } from "lucide-react";
import { courses, lessons } from "../lib/lessonData";

const courseImages = {
  "volviendo-al-principio": "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/23ef8270a_generated_image.png",
  "entendiendo-los-fundamentos": "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/25c0ae31b_generated_image.png",
};
const defaultCourseImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/57a7bb518_generated_image.png";

export default function Courses() {
  return (
    <div className="min-h-screen">
      {/* Header hero */}
      <div className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1f5c 0%, #1a3a8f 50%, #3b1f7a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(212,160,23,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(124,58,237,0.4) 0%, transparent 50%)" }} />
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
              Cursos Bíblicos
            </h1>
            <p className="text-white/60 text-lg max-w-md mx-auto">
              Profundiza en la Palabra de Dios con estudios guiados paso a paso
            </p>
          </motion.div>
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-6">
        {courses.map((course, i) => {
          const courseLessons = lessons[course.id] || [];
          const activeLessons = courseLessons.filter((l) => l.active).length;

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                course.active
                  ? "hover:shadow-2xl hover:-translate-y-1 bg-card border-border"
                  : "bg-muted/30 border-border/40 opacity-60"
              }`}
            >
              {course.active && (
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(26,110,176,0.04) 0%, rgba(124,58,237,0.04) 100%)" }} />
              )}

              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-56 aspect-video md:aspect-auto overflow-hidden shrink-0 relative">
                  <img src={courseImages[course.id] || defaultCourseImg} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {!course.active && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                      <div className="flex flex-col items-center gap-1.5">
                        <Lock className="w-6 h-6 text-white/70" />
                        <span className="text-xs text-white/70 font-medium">Próximamente</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="font-heading text-xl font-bold text-foreground">{course.title}</h2>
                      {course.active && (
                        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(26,110,176,0.1)", color: "#1a6eb0", border: "1px solid rgba(26,110,176,0.2)" }}>
                          Activo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                  </div>

                  {course.active && (
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{course.totalLessons} lecciones</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{activeLessons} disponibles</span>
                        </div>
                      </div>
                      <Link
                        to={`/cursos/${course.id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/btn"
                        style={{ color: "#1a6eb0" }}
                      >
                        Comenzar
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}