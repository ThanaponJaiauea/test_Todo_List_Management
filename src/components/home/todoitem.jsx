import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

export default function TodoItem({
  todo,
  isOwner,
  onEdit,
  onDelete,
  onToggle,
}) {
  return (
    <div
      className={`group flex items-center gap-4 bg-zinc-900/80 border rounded-2xl px-4 py-3.5 transition-all duration-200 hover:border-zinc-700 ${
        isOwner ? "border-blue-500/50" : "border-zinc-800"
      } ${todo.completed ? "opacity-60" : ""}`}
    >
      {/* Checkbox */}
      {isOwner && (
        <button
          onClick={() => onToggle(todo)}
          className={`shrink-0 transition-all duration-200 ${
            todo.completed
              ? "text-violet-500 scale-110"
              : "text-zinc-500 hover:text-violet-400"
          }`}
        >
          {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`text-sm font-medium truncate ${
              todo.completed ? "line-through text-zinc-600" : "text-white"
            }`}
          >
            {todo.title}
          </p>

          {todo.completed && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
              Completed
            </span>
          )}
        </div>

        {todo.description && (
          <p className="text-xs text-zinc-600 mt-0.5 truncate">
            {todo.description}
          </p>
        )}

        <p className="text-xs text-zinc-700 mt-0.5 truncate">
          {todo.user?.firstName} {todo.user?.lastName}
        </p>
      </div>

      {/* Date */}
      <span className="text-xs text-zinc-700 shrink-0 hidden sm:block">
        {new Date(todo.createdAt).toLocaleDateString()}
      </span>

      {/* Actions */}
      {isOwner && (
        <div
          className="flex items-center gap-1 
  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          <button
            onClick={() => onEdit(todo)}
            disabled={todo.completed}
            className={`p-1.5 rounded-lg transition ${
              todo.completed
                ? "text-zinc-700 cursor-not-allowed"
                : "hover:bg-zinc-800 text-zinc-500 hover:text-white"
            }`}
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
