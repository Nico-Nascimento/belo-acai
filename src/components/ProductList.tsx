"use client";

import { products } from "@/constants/products";
import ProductCard from "./ProductCard";

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

interface ProductListProps {
  cart: CartItem[];
  formatCurrency: (n: number) => string;
  addToCart: (product: Product) => void;
  onImageClick: (img: string) => void;
}

export default function ProductList({
  cart,
  formatCurrency,
  addToCart,
  onImageClick,
}: ProductListProps) {
  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);

        return (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            cartItem={cartItem}
            formatCurrency={formatCurrency}
            addToCart={addToCart}
            onImageClick={onImageClick} 
          />
        );
      })}
    </div>
  );
}
