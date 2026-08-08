import { ChevronDown } from "lucide-react";

export default function ScrollIndicator({ revealed }) {
  return (
    <div
      className={`absolute bottom-10 left-1/2 z-30 -translate-x-1/2 transition-all duration-1000 delay-700 ${
        revealed
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4">

        {/* Mouse */}

        <div className="flex h-14 w-8 justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md">

          <span className="mt-2 h-2 w-2 animate-bounce rounded-full bg-amber-400" />

        </div>

        {/* Text */}

        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-zinc-500">
          Scroll
        </p>

        {/* Arrow */}

        <ChevronDown
          size={18}
          className="animate-bounce text-zinc-600"
        />

      </div>
    </div>
  );
}