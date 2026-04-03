import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { courses, lessons } from "../lib/lessonData";
import QuestionBlock from "../components/lesson/QuestionBlock";
import DecisionBlock from "../components/lesson/DecisionBlock";
import ProgressBar from "../components/lesson/ProgressBar";
import AuthPrompt from "../components/shared/AuthPrompt";

const lessonImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/57a7bb518_generated_image.png";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const courseLessons = lessons[courseId] || [];
  const lesson = courseLessons.find((l) => l.id === lessonId);

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    const init = async () => {
      const authed = await base44.auth.isAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
        const records = await base44.entities.UserProgress.filter({
          lesson_id: lessonId,
          course_id: courseId,
          created_by: me.email,
        });
        if (records.length > 0) setProgress(records[0]);
      }
      setLoadingProgress(false);
    };
    init();
  }, [courseId, lessonId]);

  if (!lesson || !lesson.active) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Lección no disponible</p>
      </div>
    );
  }

  const handleSaveAnswer = async (questionId, answer) => {
    if (!isAuthenticated) return;
    const currentAnswers = progress?.answers || {};
    const currentCompleted = progress?.completed_questions || [];
    const newAnswers = { ...currentAnswers, [questionId]: answer };
    const newCompleted = currentCompleted.includes(questionId) ? currentCompleted : [...currentCompleted, questionId];

    if (progress) {
      await base44.entities.UserProgress.update(progress.id, { answers: newAnswers, completed_questions: newCompleted });
      setProgress({ ...progress, answers: newAnswers, completed_questions: newCompleted });
    } else {
      const newRecord = await base44.entities.UserProgress.create({ lesson_id: lessonId, course_id: courseId, answers: newAnswers, completed_questions: newCompleted, decision_accepted: false });
      setProgress(newRecord);
    }
  };

  const handleSaveDecision = async (accepted) => {
    if (!isAuthenticated) return;
    if (progress) {
      await base44.entities.UserProgress.update(progress.id, { decision_accepted: accepted });
      setProgress({ ...progress, decision_accepted: accepted });
    } else {
      const newRecord = await base44.entities.UserProgress.create({ lesson_id: lessonId, course_id: courseId, answers: {}, completed_questions: [], decision_accepted: accepted });
      setProgress(newRecord);
    }
  };

  const completedCount = progress?.completed_questions?.length || 0;
  const totalQuestions = lesson.questions.length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={lessonImg} alt={lesson.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,20,60,0.98) 0%, rgba(10,20,60,0.6) 50%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 pb-8">
          <Link
            to={`/cursos/${courseId}`}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a lecciones
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(212,160,23,0.25)", color: "#f0c040", border: "1px solid rgba(212,160,23,0.4)" }}>
                Lección {lesson.number}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              {lesson.title}
            </h1>
            <p className="text-white/60 mt-2 text-base">{lesson.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {!isAuthenticated && !loadingProgress && <AuthPrompt />}
        <ProgressBar completed={completedCount} total={totalQuestions} />

        <div className="space-y-5">
          {lesson.questions.map((q, i) => (
            <QuestionBlock
              key={q.id}
              question={q}
              number={i + 1}
              savedAnswer={progress?.answers?.[q.id] || ""}
              onSave={handleSaveAnswer}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>

        {lesson.decision && (
          <DecisionBlock
            decision={lesson.decision}
            accepted={progress?.decision_accepted || false}
            onSave={handleSaveDecision}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </div>
  );
}