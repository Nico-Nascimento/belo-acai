"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <>
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/logo.jpeg"
          alt="Logo Confeitaria"
          width={170}
          height={170}
          className="rounded-full shadow-lg"
        />

      </motion.div>
    </>
  );
}
