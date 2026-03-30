export default function AuthHeader({ mode }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-white">Todo List Management</h1>

      <p className="text-zinc-500 text-sm mt-1">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </p>
    </div>
  );
}
