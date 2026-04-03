import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionCard({ title, description, image, path, comingSoon, icon: Icon, index = 0 }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300 ${
        comingSoon ? "opacity-75" : "cursor-pointer"
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {comingSoon && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <Badge className="bg-primary text-primary-foreground gap-1 text-sm px-3 py-1">
              <Lock className="w-3.5 h-3.5" />
              Próximamente
            </Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3">
          {Icon && <Icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />}
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          {!comingSoon && (
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
          )}
        </div>
      </div>
    </motion.div>
  );

  if (comingSoon) return content;
  return <Link to={path}>{content}</Link>;
}