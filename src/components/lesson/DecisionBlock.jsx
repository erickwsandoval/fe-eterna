import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Save, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function DecisionBlock({ decision, accepted, onSave, isAuthenticated }) {
  const [checked, setChecked] = useState(accepted || false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(accepted || false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(checked);
    setSaved(true);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden p-8 text-center"
      style={{ background: "linear-gradient(135deg, rgba(10,32,96,0.07) 0%, rgba(124,58,237,0.08) 50%, rgba(212,160,23,0.07) 100%)", border: "1.5px solid rgba(124,58,237,0.2)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,160,23,0.12) 0%, transparent 60%)" }} />

      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg, rgba(212,160,23,0.2), rgba(212,160,23,0.1))", border: "1px solid rgba(212,160,23,0.3)" }}
        >
          <Heart className="w-8 h-8 text-accent fill-accent/30" />
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="font-heading text-xl font-bold text-foreground tracking-wide">MI DECISIÓN</h3>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>

        <p className="text-foreground/75 leading-relaxed max-w-lg mx-auto mb-7 italic text-base">
          "{decision.text}"
        </p>

        <div className="flex items-center justify-center gap-3 mb-7">
          <Checkbox
            id="decision"
            checked={checked}
            onCheckedChange={(val) => { setChecked(val); setSaved(false); }}
            className="border-accent/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <label htmlFor="decision" className="text-sm font-medium text-foreground cursor-pointer select-none">
            Acepto esta decisión
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSave}
          disabled={saving || !isAuthenticated}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={saved ? { background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" } : { background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50", boxShadow: "0 6px 20px rgba(212,160,23,0.3)" }}
        >
          {saving ? (
            <><div className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" /> Guardando...</>
          ) : saved ? (
            <><CheckCircle2 className="w-4 h-4" /> Decisión guardada</>
          ) : (
            <><Save className="w-4 h-4" /> Guardar decisión</>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}