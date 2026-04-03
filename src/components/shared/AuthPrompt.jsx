import React from "react";
import { LogIn, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function AuthPrompt({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
      style={{ background: "linear-gradient(135deg, rgba(26,110,176,0.08), rgba(124,58,237,0.08))", border: "1px solid rgba(124,58,237,0.2)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <Sparkles className="w-5 h-5 text-purple-500" />
      </div>
      <p className="text-sm text-foreground/80 flex-1 text-center sm:text-left">
        {message || "Inicia sesión para guardar tu avance y no perder tu progreso"}
      </p>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => base44.auth.redirectToLogin()}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold shrink-0 transition-all"
        style={{ background: "linear-gradient(135deg, #1a6eb0, #7c3aed)", color: "white", boxShadow: "0 4px 15px rgba(124,58,237,0.25)" }}
      >
        <LogIn className="w-4 h-4" />
        Iniciar sesión
      </motion.button>
    </motion.div>
  );
}