import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicCard({ track, index, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={track.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-foreground truncate">{track.title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{track.artist}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <a href={track.spotify} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-300">
              <ExternalLink className="w-3 h-3" />
              Spotify
            </Button>
          </a>
          <a href={track.apple} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300">
              <ExternalLink className="w-3 h-3" />
              Apple
            </Button>
          </a>
          <a href={track.youtube} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-300">
              <ExternalLink className="w-3 h-3" />
              YouTube
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}