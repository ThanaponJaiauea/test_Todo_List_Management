import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TodoPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <span className="text-xs text-zinc-600">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 disabled:opacity-20 transition"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-violet-600 text-white"
                : "text-zinc-500 hover:bg-zinc-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 disabled:opacity-20 transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
