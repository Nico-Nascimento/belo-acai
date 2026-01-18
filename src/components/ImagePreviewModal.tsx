"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImagePreviewModalProps {
  image: string | null;  // string da imagem ou null quando fechado
  close: () => void;      // função para fechar o modal
}

export default function ImagePreviewModal({ image, close }: ImagePreviewModalProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
        onClick={close}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="relative max-w-[90%] max-h-[90%]"
          onClick={(e) => e.stopPropagation()} // impede fechar ao clicar na imagem
        >
          {/* Botão X */}
          <button
            onClick={close}
            className="absolute -top-4 -right-4 bg-white text-black rounded-full px-3 py-1 shadow-lg font-bold hover:bg-gray-200"
          >
            X
          </button>

          {/* Imagem ampliada */}
          <Image
            src={image}
            alt="Preview"
            width={800}
            height={800}
            className="rounded-lg object-contain max-h-[90vh]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
