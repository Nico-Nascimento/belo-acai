"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  onClick: () => void;
}

export default function WhatsAppButton({ onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-3 left-4 p-3 transition-colors"
    >
      <Image src="/whatsapp.png" alt="WhatsApp" width={56} height={56} />
    </motion.button>
  );
}
