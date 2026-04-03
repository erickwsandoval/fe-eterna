import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgressBar({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = percentage === 100;

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: isComplete
          ? "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.04))"
          : "linear-gradient(135deg, rgba(26,110,176,0.06), rgba(124,58,237,0.06))",
        borderColor: isComplete ? "rgba(16,185,129,0.25)" : "rgba(26,110,176,0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-4 h-4 ${isComplete ? "text-emerald-500" : "text-blue-500"}`} />
          <span className="text-sm font-semibold text-foreground">Progreso</span>
        </div>
        <span
          className="text-sm font-bold px-2.5 py-0.5 rounded-full"
          style={isComplete
            ? { background: "rgba(16,185,129,0.15)", color: "#10b981" }
            : { background: "rgba(26,110,176,0.12)", color: "#1a6eb0" }
          }
        >
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 rounded-full overflow-hidden bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: isComplete
              ? "linear-gradient(90deg, #10b981, #059669)"
              : "linear-gradient(90deg, #1a6eb0, #7c3aed)",
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {completed} de {total} preguntas respondidas
        {isComplete && <span className="text-emerald-500 font-medium ml-2">¡Lección completada!</span>}
      </p>
    </div>
  );
}