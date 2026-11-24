/**
 * Shared surface utilities and entrance presets.
 *
 * Surfaces are plain Tailwind utilities built on the `@theme` tokens in
 * `app/globals.css`; entrances are Motion props, so reduced-motion handling
 * comes from the global `MotionConfig` in `app/providers.tsx`.
 */

export const glassPanel =
  "relative rounded-3xl border border-white/12 bg-glass shadow-glass backdrop-blur-[22px] backdrop-saturate-150";

export const glassRow =
  "rounded-2xl border border-white/8 bg-glass-soft shadow-glass-soft backdrop-blur-md";

export const easeOutSoft: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/** Soft rise-in used by the header and the two panels. */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.62, delay, ease: easeOutSoft },
});
