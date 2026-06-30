"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { navItems } from "@/lib/content";

export function Navbar() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.35em] text-white"
        >
          AUREX
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/checkout"
          className="rounded-full border border-[rgba(215,180,106,0.32)] bg-[rgba(215,180,106,0.08)] px-4 py-2 text-xs uppercase tracking-[0.26em] text-white transition hover:border-[rgba(215,180,106,0.75)] hover:bg-[rgba(215,180,106,0.16)]"
        >
          Checkout
        </Link>
      </div>
    </motion.header>
  );
}