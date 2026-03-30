export default function ProfileItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-3 bg-zinc-800/40 px-4 py-3 rounded-xl">
      <div className="text-zinc-400">{icon}</div>

      <div className="flex flex-col">
        <span className="text-xs text-zinc-500">{label}</span>
        <span className="text-sm text-white">{children}</span>
      </div>
    </div>
  );
}
