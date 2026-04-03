import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Lock, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { courses, lessons } from "../lib/lessonData";

export default function CourseLessons() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const courseLessons = lessons[courseId] || [];

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Curso no encontrado</p>
      </div>
    );
  }

  const activeLessons = courseLessons.filter((l) => l.active);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1f5c 0%, #1a3a8f 50%, #3b1f7a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 60%, rgba(212,160,23,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(124,58,237,0.5) 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link to="/cursos" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a cursos
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">{course.title}</h1>
            <p className="text-white/60 text-lg max-w-xl">{course.description}</p>
            <div className="flex gap-5 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{course.totalLessons}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Total</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{activeLessons.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Disponibles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-3">
          {courseLessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.035 }}
            >
              {lesson.active ? (
                <Link
                  to={`/cursos/${courseId}/${lesson.id}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 bg-card border-border hover:border-blue-300/40 dark:hover:border-blue-600/30"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm transition-transform group-hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #1a6eb0, #7c3aed)" }}
                  >
                    {lesson.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{lesson.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(26,110,176,0.1)", color: "#1a6eb0" }}>
                      Disponible
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl border bg-muted/20 border-border/40 opacity-50">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-muted">
                    <span className="text-sm font-bold text-muted-foreground">{lesson.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-muted-foreground truncate">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground/60 truncate mt-0.5">{lesson.subtitle}</p>
                  </div>
                  <Lock className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}