"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface Props {
  totalItems: number;
  cartBounce: boolean;
  openCart: () => void;
}

export default function CartFloatingButton({
  totalItems,
  cartBounce,
  openCart,
}: Props) {
  return (
    <motion.button
      onClick={openCart}
      animate={cartBounce ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-4 bg-[#b486b5] text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-colors"
    >
      <ShoppingCart />
      {totalItems > 0 && (
        <span className="bg-[#762d78] text-white text-xs font-bold px-2 py-1 rounded-full">
          {totalItems}
        </span>
      )}
    </motion.button>
  );
}
