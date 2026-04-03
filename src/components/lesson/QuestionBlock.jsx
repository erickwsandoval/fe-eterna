import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Save, CheckCircle2 } from "lucide-react";
import BibleVerseModal from "../shared/BibleVerseModal";
import { motion } from "framer-motion";

export default function QuestionBlock({ question, number, savedAnswer, onSave, isAuthenticated }) {
  const [answer, setAnswer] = useState(savedAnswer || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!savedAnswer);
  const [activeRef, setActiveRef] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    await onSave(question.id, answer);
    setSaved(true);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: number * 0.05 }}
      className="rounded-2xl border bg-card border-border shadow-sm overflow-hidden"
    >
      {/* Question header */}
      <div className="p-5 pb-0">
        <div className="flex items-start gap-3.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #1a6eb0, #7c3aed)" }}
          >
            {number}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground leading-relaxed">{question.text}</p>
            {/* Bible refs */}
            {question.references?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {question.references.map((ref, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRef(ref)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    style={{ background: "rgba(26,110,176,0.1)", color: "#1a6eb0", border: "1px solid rgba(26,110,176,0.2)" }}
                  >
                    <BookOpen className="w-3 h-3" />
                    {ref.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {saved && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Answer area */}
      <div className="p-5 pt-4">
        <Textarea
          placeholder="Escribe tu respuesta aquí..."
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setSaved(false); }}
          className="min-h-[90px] resize-none rounded-xl bg-background border-border text-sm"
        />
        <div className="flex justify-end mt-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={!answer.trim() || saving || !isAuthenticated}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={saved ? { background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" } : { background: "linear-gradient(135deg, #1a6eb0, #7c3aed)", color: "white" }}
          >
            {saving ? (
              <span className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Guardando...
              </span>
            ) : saved ? (
              <><CheckCircle2 className="w-4 h-4" /> Guardado</>
            ) : (
              <><Save className="w-4 h-4" /> Guardar respuesta</>
            )}
          </motion.button>
        </div>
      </div>

      {activeRef && (
        <BibleVerseModal reference={activeRef} open={!!activeRef} onClose={() => setActiveRef(null)} />
      )}
    </motion.div>
  );
}