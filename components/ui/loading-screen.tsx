"use client";

import { AnimatePresence, motion } from "framer-motion";

type LoadingScreenProps = {
  ready: boolean;
};

export function LoadingScreen({ ready }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {!ready ? (
        <motion.div
          role="status"
          aria-label="Loading AUREX experience"
          aria-live="polite"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="text-center">
            <p className="eyebrow mb-4">AUREX Launch Sequence</p>
            <div className="gold-line mx-auto mb-6 w-32" />
            <motion.h1
              className="font-display text-5xl tracking-[0.35em] text-white"
              initial={{ opacity: 0.4, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.4 }}
            >
              AUREX
            </motion.h1>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
