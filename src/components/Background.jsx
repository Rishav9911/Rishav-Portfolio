// Layered backdrop: grid overlay + aurora mesh wash + several
// morphing, drifting gradient blobs in different hues so the page
// doesn't read as "one shade of blue."
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  duration: 14 + (i % 6) * 2,
  delay: -(i * 1.3),
}));

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute inset-0 bg-aurora-mesh opacity-70" />

      <div
        className="absolute -top-32 left-[8%] h-[520px] w-[520px] opacity-30 blur-[110px] animate-blob-morph animate-float"
        style={{ background: "radial-gradient(circle, #4C8DFF, transparent 70%)" }}
      />
      <div
        className="absolute top-[35%] -right-32 h-[560px] w-[560px] opacity-25 blur-[120px] animate-blob-morph animate-float-slow"
        style={{
          background: "radial-gradient(circle, #FF6FB0, transparent 70%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="absolute bottom-[5%] left-[20%] h-[460px] w-[460px] opacity-20 blur-[110px] animate-blob-morph animate-float"
        style={{
          background: "radial-gradient(circle, #5CE0B8, transparent 70%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute top-[65%] right-[15%] h-[380px] w-[380px] opacity-20 blur-[100px] animate-blob-morph animate-float-slow"
        style={{
          background: "radial-gradient(circle, #FFB84D, transparent 70%)",
          animationDelay: "-2s",
        }}
      />

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-ink/25 animate-float-slow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-fade-bottom" />
    </div>
  );
}
