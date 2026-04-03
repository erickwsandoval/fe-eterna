import React from "react";
import { motion } from "framer-motion";
import { Music as MusicIcon, Clock } from "lucide-react";

const heroImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/5432d6937_generated_image.png";

const upcomingTracks = [
  { title: "Para este tiempo", artist: "Azucena Mendoza" },
  { title: "A donde tú vayas", artist: "Azucena Mendoza" },
  { title: "Prepárate", artist: "Josué López" },
  { title: "Mi redentor vive", artist: "Addy" },
  { title: "Postrado ante ti", artist: "Fernando Martínez" },
  { title: "Fuiste tú primero", artist: "Cristina Valenzuela" },
];

export default function Music() {
  return (
    <div className="min-h-screen">
      {/* Header with hero image */}
      <div className="relative py-24 overflow-hidden">
        <img src={heroImg} alt="Música" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(59,31,122,0.85) 0%, rgba(26,58,143,0.8) 50%, rgba(10,31,92,0.9) 100%)" }} />
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <MusicIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Música</h1>
            <p className="text-white/60 text-lg max-w-md mx-auto">
              Alabanzas y adoración para elevar tu espíritu y acercarte a Dios
            </p>
          </motion.div>
        </div>
      </div>

      {/* Coming soon tracks */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)" }}>
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-purple-500 uppercase tracking-wider">Próximamente</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Canciones que se estrenarán pronto</h2>
        </motion.div>

        <div className="space-y-3">
          {upcomingTracks.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-2xl border bg-card border-border"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed, #1a6eb0)" }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{track.title}</p>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </div>
              <div className="shrink-0 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.2)" }}>
                Pronto
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}