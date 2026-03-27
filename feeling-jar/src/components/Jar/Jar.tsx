import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./jar.css";

interface JarProps {
  phrases: string[];
  emotion: string;
}
type Paper = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const phrases: string[] = [
  "Todo pasa, incluso esto.",
  "Respira, estás haciendo lo mejor que puedes.",
  "No tienes que tener todo resuelto hoy.",
  "Eres suficiente tal como eres.",
  "Un paso a la vez también es avanzar.",
  "Permítete sentir sin juzgarte.",
];

const emotionColorMap: Record<string, string> = {
  Feliz: "#ffeb3b",
  Triste: "#90caf9",
  Enfadada: "#f44336",
  Ansiosa: "#ba68c8",
  Sola: "#6c757d",
  Agradecida: "#81c784",
  default: "#ffffff",
};

const Jar: React.FC<JarProps> = ({ phrases, emotion }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const paperColor = emotionColorMap[emotion] ?? emotionColorMap.default;

  const papers = useMemo<Paper[]>(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 45,
      y: Math.random() * 60 + 65,
      rotate: Math.random() * 40 - 20,
      scale: Math.random() * 0.3 + 1,
    }));
  }, []);

  const handleClick = () => {
    if (isShaking) return;
    setIsShaking(true);
    setSelectedId(null);

    setSelectedPhrase(null);
    setTimeout(() => {
      const randomPaper = papers[Math.floor(Math.random() * papers.length)];

      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

      setSelectedId(randomPaper.id);
      setSelectedPhrase(randomPhrase);
      setIsShaking(false);
    }, 400);
  };

  return (
    <div className="containerJar">
      <AnimatePresence mode="wait">
        {selectedPhrase && (
          <motion.div
            key={selectedPhrase}
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: -200, scale: 1 }}
            exit={{ opacity: 0, y: -200, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="phraseContainer"
          >
            <p className="text">{selectedPhrase}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="220"
        height="320"
        viewBox="0 0 200 300"
        onClick={handleClick}
        className="jar"
        animate={isShaking ? { x: [0, -6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <defs>
          <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>

          <linearGradient id="lidGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>

          <clipPath id="jarClip">
            <path d="M50 80 Q50 45 100 45 Q150 45 150 80 L150 220 Q150 260 100 260 Q50 260 50 220 Z" />
          </clipPath>
        </defs>

        <ellipse cx="100" cy="270" rx="55" ry="10" fill="rgba(0,0,0,0.1)" />

        <g clipPath="url(#jarClip)">
          {papers.map((p) => {
            const isSelected = p.id === selectedId;

            return (
              <motion.rect
                initial={false}
                key={`${p.id}-${selectedId}`}
                x={p.x}
                y={p.y}
                width="22"
                height="12"
                rx="3"
                fill={paperColor}
                style={{
                  rotate: p.rotate,
                  scale: p.scale,
                  transformOrigin: "center",
                }}
                animate={
                  isSelected
                    ? {
                        // x: [p.x, 60],
                        y: [p.y, -200],
                        scale: [p.scale, 1.8],
                        rotate: [p.rotate, 0],
                        opacity: [1, 0],
                      }
                    : {
                        opacity: 1,
                        y: [p.y, p.y - 8, p.y],
                      }
                }
                transition={{
                  duration: isSelected ? 0.6 : 2,
                  repeat: isSelected ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </g>

        <rect
          x="55"
          y="25"
          width="90"
          height="35"
          rx="12"
          fill="url(#lidGradient)"
        />
        <rect
          x="65"
          y="50"
          width="70"
          height="20"
          rx="8"
          fill="rgba(255,255,255,0.2)"
        />

        <path
          d="M50 80 Q50 45 100 45 Q150 45 150 80 L150 220 Q150 260 100 260 Q50 260 50 220 Z"
          fill="url(#glassGradient)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />

        <ellipse
          cx="75"
          cy="150"
          rx="12"
          ry="70"
          fill="rgba(255,255,255,0.25)"
        />
        <ellipse
          cx="120"
          cy="140"
          rx="6"
          ry="40"
          fill="rgba(255,255,255,0.15)"
        />
      </motion.svg>

      {!selectedPhrase && <p className="hint">Toca el frascossss</p>}
    </div>
  );
};

export default Jar;
