import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function BibleVerseModal({ reference, onClose, open }) {
  const [verseText, setVerseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchVerse = async () => {
    if (fetched) return;
    setLoading(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Dame el texto bíblico de ${reference.label} en la versión Reina Valera 1995. Solo devuelve el texto del versículo, sin comentarios ni explicaciones adicionales. Incluye la numeración de cada versículo.`,
        response_json_schema: {
          type: "object",
          properties: {
            reference: { type: "string" },
            text: { type: "string" },
          },
        },
      });
      setVerseText(result.text || "No se pudo cargar el versículo.");
      setFetched(true);
    } catch {
      setVerseText("Error al cargar el versículo. Intenta de nuevo.");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (open && !fetched) {
      fetchVerse();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            {reference.label}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-ring" />
              <span className="ml-2 text-muted-foreground">Cargando versículo...</span>
            </div>
          ) : (
            <div className="bg-secondary/50 rounded-lg p-5 border border-border">
              <p className="text-foreground leading-relaxed italic font-body">
                "{verseText}"
              </p>
              <p className="text-right text-sm text-muted-foreground mt-3 font-medium">
                — {reference.label} (RVR 1995)
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}