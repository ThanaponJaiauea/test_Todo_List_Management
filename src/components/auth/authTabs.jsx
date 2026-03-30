export default function AuthTabs({ mode, toggleMode }) {
  return (
    <div className="flex bg-zinc-800/60 rounded-xl p-1 mb-6">
      {["login", "register"].map((m) => (
        <button
          key={m}
          onClick={toggleMode}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            mode === m
              ? "bg-zinc-700 text-white shadow"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {m === "login" ? "Login" : "Register"}
        </button>
      ))}
    </div>
  );
}
