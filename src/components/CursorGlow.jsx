import { useEffect, useRef } from "react";

// A soft multi-hue glow that follows the cursor, giving the whole page
// an "alive" feeling without being distracting. Disabled on touch devices
// and respects prefers-reduced-motion.
export default function CursorGlow() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 220}px, ${
          pos.current.y - 220
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[440px] w-[440px] rounded-full opacity-[0.15] blur-[100px] md:block"
      style={{
        background:
          "radial-gradient(circle, #4C8DFF 0%, #A469FF 35%, #FF6FB0 65%, transparent 75%)",
      }}
    />
  );
}
