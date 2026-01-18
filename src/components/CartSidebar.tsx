"use client";

import { motion, AnimatePresence } from "framer-motion";

/* =========================
   TIPAGEM
========================= */

interface CartItem {
  id: number;
  name: string;
  size: string;
  toppings: string[];
  extras: string[];
  observation: string;
  price: number;
  quantity: number;
}

interface Props {
  cartOpen: boolean;
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  showFreteInput: boolean;
  endereco: string;
  setEndereco: (v: string) => void;

  closeCart: () => void;
  removeOne: (id: number) => void;
  addOne: (id: number) => void;
  clearCart: () => void;
  sendFrete: () => void;
  toggleFrete: () => void;
  sendToWhatsApp: () => void;
  formatCurrency: (n: number) => string;
}

/* =========================
   COMPONENT
========================= */

export default function CartSidebar({
  cartOpen,
  cart,
  totalItems,
  totalPrice,
  showFreteInput,
  endereco,
  setEndereco,

  closeCart,
  removeOne,
  addOne,
  clearCart,
  sendFrete,
  toggleFrete,
  sendToWhatsApp,
  formatCurrency,
}: Props) {
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col z-50"
          >
            <h2 className="text-xl font-bold mb-4">
              Carrinho ({totalItems} itens)
            </h2>

            {/* LISTA */}
            <motion.ul
              layout
              className="flex-1 overflow-y-auto space-y-3"
            >
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/90 rounded-md p-3 shadow-sm space-y-1"
                  >
                    {/* NOME */}
                    <p className="font-semibold text-sm">{item.name}</p>

                    {/* TOPPINGS */}
                    {item.toppings.length > 0 && (
                      <div className="text-xs text-gray-700">
                        <p className="font-medium">Adicionais grátis:</p>
                        {item.toppings.map((t, i) => (
                          <p key={i}>- {t}</p>
                        ))}
                      </div>
                    )}

                    {/* EXTRAS */}
                    {item.extras.length > 0 && (
                      <div className="text-xs text-gray-700">
                        <p className="font-medium">Extras:</p>
                        {item.extras.map((e, i) => (
                          <p key={i}>- {e}</p>
                        ))}
                      </div>
                    )}

                    {/* OBSERVAÇÃO */}
                    {item.observation && (
                      <p className="text-xs italic text-gray-500">
                        Obs: {item.observation}
                      </p>
                    )}

                    {/* PREÇO */}
                    <p className="text-sm font-medium mt-1">
                      {formatCurrency(item.price)}
                    </p>

                    {/* CONTROLES */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeOne(item.id)}
                          className="bg-[#b486b5] text-white px-3 py-1 rounded"
                        >
                          -
                        </button>

                        <span className="font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => addOne(item.id)}
                          className="bg-[#762d78] text-white px-3 py-1 rounded"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {/* TOTAL */}
            <p className="mt-4 font-bold">
              Total: {formatCurrency(totalPrice)}
            </p>

            {/* AÇÕES */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={clearCart}
                className="bg-[#762d78] text-white py-2 rounded"
              >
                Esvaziar Carrinho
              </button>

              {!showFreteInput ? (
                <button
                  onClick={toggleFrete}
                  className="bg-[#b486b5] text-white py-2 rounded"
                >
                  Solicitar Taxa de Entrega
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço"
                    className="border p-2 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={sendFrete}
                      className="bg-[#03a064] text-white py-1 rounded flex-1"
                    >
                      Enviar
                    </button>
                    <button
                      onClick={toggleFrete}
                      className="bg-[#b486b5] text-white py-1 rounded flex-1"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={sendToWhatsApp}
                className="bg-[#03a064] text-white py-2 rounded"
              >
                Enviar Pedido no WhatsApp
              </button>

              <button
                onClick={closeCart}
                className="bg-[#551f57] text-white py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
