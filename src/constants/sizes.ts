export type AcaiSize = {
  id: string;
  volume: string;
  label: string;
  price: number;
  maxToppings: number;
};

export const acaiSizes: AcaiSize[] = [
  {
    id: "300ml",
    volume: "300ml",
    label: "Pequeno",
    price: 13.9,
    maxToppings: 3,
  },
  {
    id: "500ml",
    volume: "500ml",
    label: "Médio",
    price: 19.9,
    maxToppings: 4,
  },
  {
    id: "700ml",
    volume: "700ml",
    label: "Grande",
    price: 26.9,
    maxToppings: 5,
  },
];
