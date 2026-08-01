import { useScrollProgress } from "../hooks/useScrollProgress";

// The "agent trace" motif — a thin gradient line across the top of the
// viewport that fills as the visitor scrolls, with a pulsing dot at the
// leading edge, echoing the token/data-flow visuals used in the project cards.
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="relative h-full bg-trace-gradient transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-aurora-pink shadow-glow-pink animate-pulse-trace" />
      </div>
    </div>
  );
}
