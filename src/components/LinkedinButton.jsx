import { CircleDollarSign } from "lucide-react";
export default function LinkedinButton() {
  return (
    <button className="flex items-center max-h-10  justify-center p-2 rounded-lg bg-slate-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
      <CircleDollarSign size={20} />
      <p className="font-bold pl-2">Doar</p>
    </button>
  );
}
