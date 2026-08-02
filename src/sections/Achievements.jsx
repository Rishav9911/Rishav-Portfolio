import { useRef, useEffect, useLayoutEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  TbTrophy,
  TbCertificate,
  TbCode,
  TbGitPullRequest,
  TbUsers,
  TbFlask,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";
import { achievements } from "../data/achievements";
import { accent, ACCENT_KEYS } from "../utils/accents";
import GlassCard from "../components/GlassCard";

const ICONS = {
  Hackathon: TbTrophy,
  Certification: TbCertificate,
  "Problem Solving": TbCode,
  "Open Source": TbGitPullRequest,
  Leadership: TbUsers,
  Research: TbFlask,
};

// Single source of truth for card width — the track's side padding is
// derived from this so any card can still reach dead center of the
// viewport when scrolled all the way to either edge.
const TRACK_STYLE = {
  "--card-w": "clamp(280px, 68vw, 420px)",
  paddingLeft: "calc(50% - (clamp(280px, 68vw, 420px) / 2))",
  paddingRight: "calc(50% - (clamp(280px, 68vw, 420px) / 2))",
};

const AUTOPLAY_MS = 4200;
const GAP_PX = 24; // matches the track's gap-6

// How many real items make up one "lap" of the carousel.
const N = achievements.length;
// Rendering three consecutive laps — [prev][current][next] — is the
// classic trick for a seamless infinite carousel: the moment the user
// scrolls out of the middle lap, we silently teleport the scroll
// position back by exactly one lap's width. Because the lap on either
// side is pixel-identical to the middle one, that teleport is
// completely invisible — no flicker, no snap-back, no visible reset.
const SET_COUNT = 3;

// Flat list of every rendered card across all three laps, each tagged
// with which lap it belongs to and which real item it mirrors.
const LOOP_ITEMS = Array.from({ length: SET_COUNT }, (_, setIndex) =>
  achievements.map((item, origIndex) => ({
    item,
    origIndex,
    setIndex,
    key: `${item.id}-${setIndex}`,
  }))
).flat();

const START_INDEX = N + Math.floor(N / 2); // land in the middle lap on mount

function AchievementCard({ item, cardRef, a, hiddenFromAT }) {
  const Icon = ICONS[item.type] || TbTrophy;
  return (
    <div
      ref={cardRef}
      aria-hidden={hiddenFromAT || undefined}
      className="snap-center flex-shrink-0 w-[var(--card-w)] will-change-transform"
    >
      <GlassCard
        className={`relative h-full min-h-[360px] overflow-hidden p-8 sm:p-9 flex flex-col justify-between border ${a.border}`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${a.gradient} opacity-20 blur-3xl`}
        />

        <div className="relative z-10 flex items-start justify-between">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${a.gradient} text-white shadow-glass`}
          >
            <Icon size={27} />
          </span>
          <span className={`rounded-full ${a.bg} border ${a.border} px-3 py-1 text-[12.3px] font-mono font-medium ${a.text}`}>
            {item.year}
          </span>
        </div>

        <div className="relative z-10 mt-8">
          <p className={`eyebrow mb-2 ${a.text}`}>{item.type}</p>
          <h3 className="font-display text-xl sm:text-[1.568rem] font-semibold leading-snug tracking-tight text-ink">
            {item.title}
          </h3>
          <p className="mt-3 text-sm text-ink-faint leading-relaxed">{item.org}</p>
        </div>
      </GlassCard>
    </div>
  );
}

export default function Achievements() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const rafRef = useRef(null);
  const autoplayRef = useRef(null);
  const settleTimerRef = useRef(null);
  const nearestIndexRef = useRef(START_INDEX);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  cardRefs.current = [];
  const setCardRef = (el) => {
    if (el) cardRefs.current.push(el);
  };

  const getStep = useCallback(() => {
    const card = cardRefs.current[0];
    if (!card) return 0;
    return card.getBoundingClientRect().width + GAP_PX;
  }, []);

  // Scale + fade cards by distance from the track's visual center —
  // driven straight off scroll position for buttery, native-feeling
  // motion. Also tracks which card is nearest-to-center so the
  // boundary-correction and snap logic below can reference it.
  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;

    let minDist = Infinity;
    let minIndex = nearestIndexRef.current;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(center - cardCenter);
      const norm = Math.min(dist / (trackRect.width / 2.1), 1);
      const scale = 1.06 - norm * 0.26;
      const opacity = 1 - norm * 0.65;
      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    });

    nearestIndexRef.current = minIndex;
    rafRef.current = null;
  }, []);

  // Once scrolling has settled outside the middle lap, teleport back
  // into it by exactly one lap-width. Only runs after motion stops, so
  // the jump lands on an already-static frame — nothing to see.
  const correctBoundary = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    if (!step) return;
    const idx = nearestIndexRef.current;

    if (idx < N) {
      track.scrollLeft += N * step;
      nearestIndexRef.current = idx + N;
    } else if (idx >= 2 * N) {
      track.scrollLeft -= N * step;
      nearestIndexRef.current = idx - N;
    } else {
      return;
    }
    updateScales();
  }, [getStep, updateScales]);

  const onScroll = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(updateScales);
    }
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(correctBoundary, 140);
  }, [updateScales, correctBoundary]);

  // Land on the middle lap's featured card the instant the carousel
  // mounts — no scroll animation from another card, no dependence on
  // whatever scroll position the browser happened to restore. Runs in
  // a layout effect so it's applied before the first paint.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[START_INDEX];
    if (track && card) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const cardCenterFromTrackStart =
        track.scrollLeft + (cardRect.left - trackRect.left) + cardRect.width / 2;
      // Direct scrollLeft assignment is instant regardless of the
      // track's `scroll-behavior: smooth` — no animated slide-in.
      track.scrollLeft = cardCenterFromTrackStart - trackRect.width / 2;
    }
    nearestIndexRef.current = START_INDEX;
    updateScales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    track?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, [onScroll]);

  // Plain (vertical) mouse-wheel gestures are translated into
  // horizontal carousel motion so scrolling "just works" with a
  // regular mouse, not only trackpads. Trackpad horizontal gestures
  // (deltaX-dominant) are left untouched — the browser already routes
  // those straight into the track's native overflow-x scrolling.
  // Needs a non-passive listener so preventDefault actually applies,
  // which React's synthetic onWheel won't give us for wheel events.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCards = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    if (!step) return;
    // No start/end edge cases to special-case anymore — every card has
    // real neighbours on both sides, so we always just step. The
    // boundary-correction effect quietly keeps the underlying scroll
    // position sane once the animation settles.
    track.scrollBy({ left: step * dir, behavior: "smooth" });
  }, [getStep]);

  // Smoothly settle onto whichever card is nearest-to-center — used
  // after a manual mouse-drag ends, since JS-driven scrollLeft changes
  // don't trigger the browser's native scroll-snap the way wheel/touch
  // gestures do.
  const snapToNearest = useCallback(() => {
    const track = trackRef.current;
    const card = cardRefs.current[nearestIndexRef.current];
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target =
      track.scrollLeft + (cardRect.left - trackRect.left) + cardRect.width / 2 - trackRect.width / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Mouse drag-to-scroll. Touch is left to the browser's native pan
  // scrolling (and its native snap), so this only engages for mouse
  // pointers.
  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    setIsDragging(true);
    track.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 3) d.moved = true;
    track.scrollLeft = d.startScroll - dx;
  }, []);

  const endDrag = useCallback((e) => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    setIsDragging(false);
    trackRef.current?.releasePointerCapture?.(e.pointerId);
    if (d.moved) snapToNearest();
  }, [snapToNearest]);

  // Autoplay — pauses on hover, touch, or an active drag; resumes
  // smoothly afterwards. Loops infinitely since scrollByCards no
  // longer has an "end" to reach.
  useEffect(() => {
    if (isHovering || isDragging) return;
    autoplayRef.current = setInterval(() => scrollByCards(1), AUTOPLAY_MS);
    return () => clearInterval(autoplayRef.current);
  }, [isHovering, isDragging, scrollByCards]);

  return (
    <section id="achievements" className="overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-lg"
          >
            <p className="eyebrow mb-3 text-aurora-violet">Recognition</p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-ink">
              Wins, certs &amp;<br className="hidden sm:block" /> side quests.
            </h2>
      
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => scrollByCards(-1)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Previous achievement"
              className="flex h-12 w-12 items-center justify-center rounded-full glass text-ink hover:border-aurora-violet/40 transition-colors"
            >
              <TbChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={() => scrollByCards(1)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Next achievement"
              className="flex h-12 w-12 items-center justify-center rounded-full glass text-ink hover:border-aurora-violet/40 transition-colors"
            >
              <TbChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Achievements carousel"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={TRACK_STYLE}
        className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 cursor-grab ${
          isDragging ? "cursor-grabbing select-none [scroll-snap-type:none]" : ""
        }`}
      >
        {LOOP_ITEMS.map(({ item, origIndex, setIndex, key }) => {
          const a = accent(ACCENT_KEYS[origIndex % ACCENT_KEYS.length]);
          return (
            <AchievementCard
              key={key}
              item={item}
              cardRef={setCardRef}
              a={a}
              hiddenFromAT={setIndex !== 1}
            />
          );
        })}
      </div>
    </section>
  );
}
