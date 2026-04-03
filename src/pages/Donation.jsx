import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Globe, Shield, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const donationImg = "https://media.base44.com/images/public/69ced9bc3ea71b3bb8011feb/e5a631ff1_generated_image.png";

const AMOUNTS = [5, 10, 25, 50, 100];

export default function Donation() {
  const { toast } = useToast();
  const [selected, setSelected] = useState(25);
  const [custom, setCustom] = useState("");

  const handleDonate = () => {
    toast({
      title: "¡Gracias por tu generosidad!",
      description: "Próximamente habilitaremos el sistema de pagos. Tu apoyo significa mucho.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={donationImg} alt="Donación" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,20,60,0.98) 0%, rgba(10,20,60,0.5) 60%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <span className="text-white/60 text-sm uppercase tracking-widest font-medium">Apoya la misión</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
              Tu donación<br />
              <span style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                transforma vidas
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {/* Inspirational quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 text-center mb-8"
          style={{ background: "linear-gradient(135deg, rgba(26,110,176,0.08), rgba(124,58,237,0.08))", border: "1px solid rgba(124,58,237,0.15)" }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-accent" />
          <blockquote className="text-lg md:text-xl text-foreground font-light leading-relaxed italic">
            "Cada uno dé como propuso en su corazón, no con tristeza ni por obligación,
            porque Dios ama al dador alegre."
          </blockquote>
          <p className="text-muted-foreground text-sm mt-3 font-medium">— 2 Corintios 9:7</p>
        </motion.div>

        {/* Donation card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 bg-card border border-border shadow-xl"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">Elige un monto</h2>

          {/* Amount selector */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => { setSelected(amount); setCustom(""); }}
                className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={selected === amount && !custom
                  ? { background: "linear-gradient(135deg, #1a6eb0, #7c3aed)", color: "white", boxShadow: "0 4px 15px rgba(26,110,176,0.4)" }
                  : { background: "rgba(26,110,176,0.07)", border: "1px solid rgba(26,110,176,0.15)", color: "hsl(var(--foreground))" }
                }
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <input
              type="number"
              placeholder="Otro monto"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full pl-8 pr-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor: "hsl(var(--border))", focusRingColor: "rgba(26,110,176,0.5)" }}
            />
          </div>

          {/* Selected display */}
          <div className="text-center mb-6">
            <p className="text-4xl font-bold font-heading" style={{ background: "linear-gradient(135deg, #1a6eb0, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ${custom || selected || "0"} USD
            </p>
          </div>

          {/* Donate button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDonate}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all"
            style={{ background: "linear-gradient(135deg, #d4a017, #f0c040)", color: "#1a2a50", boxShadow: "0 8px 30px rgba(212,160,23,0.35)" }}
          >
            <Heart className="w-5 h-5 fill-current" />
            Donar con amor
          </motion.button>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            {[
              { icon: Shield, label: "Seguro" },
              { icon: CreditCard, label: "Stripe / PayPal" },
              { icon: Globe, label: "Internacional" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: "📖", title: "Educación", desc: "Apoya el desarrollo de nuevas lecciones bíblicas" },
            { icon: "🎵", title: "Música", desc: "Financia producción musical cristiana" },
            { icon: "🌍", title: "Misión", desc: "Expande el alcance a más personas en el mundo" },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl text-center border bg-card border-border"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}