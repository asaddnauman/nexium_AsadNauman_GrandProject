"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4">
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-6 font-gabriola"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Asad Nauman
      </motion.h1>
      <motion.p
        className="text-2xl md:text-4xl font-gabriola"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Engineering smart systems with code, current, and climate.
      </motion.p>
    </section>
  );
}
