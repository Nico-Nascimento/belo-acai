"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Tipos usados
interface Product {
  id: number;
  name: string;
  description: string;
  serves: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
  cartItem: CartItem | undefined;
  formatCurrency: (value: number) => string;
  addToCart: (product: Product) => void;
  onImageClick: (img: string) => void;
}

export default function ProductCard({
  product,
  cartItem,
  index,
  formatCurrency,
  addToCart,
  onImageClick,
}: ProductCardProps) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-center gap-4 border p-4 rounded-lg shadow bg-white/80 relative hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={140}
          height={140}
          className="rounded-md object-cover cursor-pointer"
          onClick={() => onImageClick(product.image)}
        />

        <AnimatePresence>
          {cartItem && (
            <motion.span
              key={cartItem.quantity}
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 bg-[#613424] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md"
            >
              {cartItem.quantity}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500 italic">{product.serves}</p>
        </div>

        <div className="flex justify-end items-center gap-12 mt-3">
          <p className="font-bold text-[#613424]">
            {formatCurrency(product.price)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#613424] text-white px-3 py-1 rounded hover:bg-[#2e0e02] transition-all"
          >
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
