"use client";

import { useState, useMemo } from "react";
import { acaiSizes } from "@/constants/sizes";
import { toppings } from "@/constants/toppings";
import { extras } from "@/constants/extras";

interface AcaiCardProps {
  addToCart: (item: {
    name: string;
    size: string;
    toppings: string[];
    extras: string[];
    observation: string;
    price: number;
  }) => void;
}

export default function AcaiCard({ addToCart }: AcaiCardProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const [spoon, setSpoon] = useState<"com" | "sem">("com");

  const MAX_EXTRAS = 4;

  const selectedSize = acaiSizes.find((s) => s.id === selectedSizeId);

  /* =========================
     TOGGLES
  ========================= */

  function toggleTopping(id: string) {
    if (!selectedSize) return;

    if (selectedToppings.includes(id)) {
      setSelectedToppings((prev) => prev.filter((i) => i !== id));
      return;
    }

    if (selectedToppings.length >= selectedSize.maxToppings) return;

    setSelectedToppings((prev) => [...prev, id]);
  }

  function toggleExtra(id: string) {
    if (selectedExtras.includes(id)) {
      setSelectedExtras((prev) => prev.filter((i) => i !== id));
      return;
    }

    if (selectedExtras.length >= MAX_EXTRAS) return;

    setSelectedExtras((prev) => [...prev, id]);
  }

  /* =========================
     PREÇO
  ========================= */

  const totalPrice = useMemo(() => {
    if (!selectedSize) return 0;
    return selectedSize.price + selectedExtras.length * 2;
  }, [selectedSize, selectedExtras]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(n);

  /* =========================
     ADD TO CART
  ========================= */

  function handleAddToCart() {
    if (!selectedSize) {
      alert("Escolha o tamanho do açaí");
      return;
    }

    addToCart({
      name: `Açaí ${selectedSize.volume}`,
      size: selectedSize.volume,
      toppings: toppings
        .filter((t) => selectedToppings.includes(t.id))
        .map((t) => t.name),
      extras: extras
        .filter((e) => selectedExtras.includes(e.id))
        .map((e) => e.name),
      observation: `${spoon === "com" ? "Com colher" : "Sem colher"}${comment ? ` | ${comment}` : ""
        }`,
      price: totalPrice,
    });

    // Reset (UX estilo iFood)
    setSelectedSizeId(null);
    setSelectedToppings([]);
    setSelectedExtras([]);
    setComment("");
    setSpoon("com");

  }

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="max-w-xl mx-auto bg-white/90 rounded-xl shadow-lg p-5 space-y-6">
      <h2 className="text-xl font-bold text-center">Monte seu Açaí 🍧</h2>

      {/* TAMANHO */}
      <div>
        <h3 className="font-semibold mb-2">Escolha o tamanho</h3>
        <div className="grid grid-cols-3 gap-2">
          {acaiSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => {
                setSelectedSizeId(size.id);
                setSelectedToppings([]);
              }}
              className={`border rounded-lg p-3 text-sm transition
                ${selectedSizeId === size.id
                  ? "bg-[#762d78] text-white border-[#762d78]"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <p className="font-semibold">{size.volume}</p>
              <p className="text-xs">{formatCurrency(size.price)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* TOPPINGS */}
      <div>
        <h3 className="font-semibold mb-1">
          Adicionais grátis
          {selectedSize && (
            <span className="text-sm text-gray-500 ml-2">
              ({selectedToppings.length}/{selectedSize.maxToppings})
            </span>
          )}
        </h3>

        {!selectedSize && (
          <p className="text-sm text-gray-500 mb-2">
            Escolha um tamanho para liberar os adicionais
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          {toppings.map((t) => {
            const selected = selectedToppings.includes(t.id);
            const limitReached =
              selectedSize &&
              selectedToppings.length >= selectedSize.maxToppings &&
              !selected;

            const disabled = !selectedSize || limitReached;

            return (
              <button
                key={t.id}
                onClick={() => toggleTopping(t.id)}
                disabled={disabled}
                className={`border rounded-lg p-2 text-sm transition
                  ${selected
                    ? "bg-[#b486b5] border-[#762d78]"
                    : disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* EXTRAS */}
      <div>
        <h3 className="font-semibold mb-2">
          Turbinar - Adicionais Extras (+ R$ 2,00 cada)
          <span className="text-sm text-gray-500 ml-2">
            ({selectedExtras.length}/{MAX_EXTRAS})
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {extras.map((e) => {
            const selected = selectedExtras.includes(e.id);
            const limitReached =
              selectedExtras.length >= MAX_EXTRAS && !selected;

            return (
              <button
                key={e.id}
                onClick={() => toggleExtra(e.id)}
                disabled={limitReached}
                className={`border rounded-lg p-2 text-sm transition
                  ${selected
                    ? "bg-[#7c0080] border-[#3e0040]"
                    : limitReached
                      ? "opacity-40 cursor-not-allowed"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* COLHER */}
      <div>
        <h3 className="font-semibold mb-2">Colher</h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSpoon("com")}
            className={`border rounded-lg p-3 text-sm font-medium transition
        ${spoon === "com"
                ? "bg-[#762d78] text-white border-[#762d78]"
                : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            🥄 Com colher
          </button>

          <button
            onClick={() => setSpoon("sem")}
            className={`border rounded-lg p-3 text-sm font-medium transition
        ${spoon === "sem"
                ? "bg-[#762d78] text-white border-[#762d78]"
                : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            🚫 Sem colher
          </button>
        </div>
      </div>


      {/* OBSERVAÇÕES */}
      <div>
        <h3 className="font-semibold mb-2">Observações do pedido</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={140}
          rows={3}
          placeholder="Ex: Leite condensado apenas no meio do açaí."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#762d78]"
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {comment.length}/140
        </div>
      </div>

      {/* TOTAL + BOTÃO */}
      <div className="flex flex-col gap-3 border-t pt-4">
        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#762d78] text-white py-3 rounded-lg font-semibold hover:bg-[#551f57] transition-transform hover:scale-[1.02]"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
