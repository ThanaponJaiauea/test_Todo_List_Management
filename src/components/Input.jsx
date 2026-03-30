import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Input({ name, type, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full space-y-1">
      <div className="relative">
        <input
          name={name || ""}
          type={isPassword ? (show ? "text" : "password") : type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-zinc-800/80 border rounded-[15px] px-4 py-2.5 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                : "border-zinc-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
            }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && <p className="text-[12px] text-red-500 ml-1">* {error}</p>}
    </div>
  );
}
