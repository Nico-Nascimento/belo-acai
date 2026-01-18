"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import AcaiCard from "@/components/AcaiCard";
import CartFloatingButton from "@/components/CartFloatingButton";
import CartSidebar from "@/components/CartSidebar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

/* =========================
   TIPOS
========================= */

export interface AcaiCartItem {
  id: number;
  name: string;
  size: string;
  toppings: string[];
  extras: string[];
  observation: string;
  price: number;
  quantity: number;
}

/* =========================
   PAGE
========================= */

export default function Page() {
  const [cart, setCart] = useState<AcaiCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const [showFreteInput, setShowFreteInput] = useState(false);
  const [endereco, setEndereco] = useState("");

  const whatsappNumber = "5551994515875";

  /* =========================
     PERSISTÊNCIA
  ========================= */

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* =========================
     CARRINHO
  ========================= */

  const addAcaiToCart = (
    item: Omit<AcaiCartItem, "id" | "quantity">
  ) => {
    setCart((prev) => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        quantity: 1,
      },
    ]);

    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  };

  const removeOneFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addOneFromCart = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    const audio = new Audio("/clear.wav");
    audio.volume = 0.4;
    audio.play();
    setCart([]);
  };

  /* =========================
     WHATSAPP
  ========================= */

  const formatCartMessage = () => {
    if (cart.length === 0) {
      return "Olá! Gostaria de fazer um pedido de Açaí 🍧";
    }

    const itemsText = cart
      .map((item) => {
        const toppingsText = item.toppings.length
          ? item.toppings.map((t) => `- ${t}`).join("\n")
          : "- Nenhum";

        const extrasText = item.extras.length
          ? item.extras.map((e) => `- ${e}`).join("\n")
          : "- Nenhum";

        return (
          `🍧 *${item.name}*\n` +
          `Quantidade: ${item.quantity}\n\n` +
          `*Adicionais grátis:*\n${toppingsText}\n\n` +
          `*Extras:*\n${extrasText}\n\n` +
          `*Observação:*\n${item.observation || "- Nenhuma"}\n\n` +
          `Valor unitário: R$ ${item.price
            .toFixed(2)
            .replace(".", ",")}\n` +
          `Subtotal: R$ ${(item.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}`
        );
      })
      .join("\n\n---------------------\n\n");

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    return (
      `🛒 *Pedido de Açaí* 🛒\n\n` +
      `${itemsText}\n\n` +
      `💰 *Total:* R$ ${total.toFixed(2).replace(".", ",")}`
    );
  };

  const sendToWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      formatCartMessage()
    )}`;
    window.open(url, "_blank");
  };

  const sendHelloWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Olá! Gostaria de informações sobre o Açaí 🍧"
    )}`;
    window.open(url, "_blank");
  };

  /* =========================
     AUXILIARES
  ========================= */

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(n);

  /* =========================
     RENDER
  ========================= */

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <Header />

      <AcaiCard addToCart={addAcaiToCart} />

      <CartFloatingButton
        totalItems={totalItems}
        cartBounce={cartBounce}
        openCart={() => setCartOpen(true)}
      />

      <WhatsAppButton onClick={sendHelloWhatsApp} />

      <CartSidebar
        cartOpen={cartOpen}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        showFreteInput={showFreteInput}
        endereco={endereco}
        setEndereco={setEndereco}
        closeCart={() => setCartOpen(false)}
        removeOne={removeOneFromCart}
        addOne={addOneFromCart}
        clearCart={clearCart}
        sendFrete={() => {}}
        toggleFrete={() => setShowFreteInput(!showFreteInput)}
        sendToWhatsApp={sendToWhatsApp}
        formatCurrency={formatCurrency}
      />

      <Footer />
    </div>
  );
}
