import { Heart } from "lucide-react";

export default function RenderHearts (state) {
  // Lógica para renderizar os corações
  return Array.from({ length: state.totalHearts }).map((_, i) => (
    <Heart
      key={i}
      className={`w-6 h-6 ${
        !(i >= state.hearts)
          ? "text-red-800 fill-red-700"
          : "text-gray-500 dark:text-gray-800"
      }`}
    />
  ));
};