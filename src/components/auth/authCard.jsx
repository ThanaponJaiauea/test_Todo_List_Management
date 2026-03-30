export default function AuthCard({ children }) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 shadow-2xl">
      {children}
    </div>
  );
}
