import { Search } from "lucide-react";

export default function TodoEmpty({ searchQuery, onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30">
      <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
        <Search size={24} className="text-zinc-600" />
      </div>
      <h3 className="text-white font-medium">No todos found</h3>
      <p className="text-zinc-500 text-sm text-center mt-1 max-w-[250px]">
        {searchQuery
          ? `We couldn't find anything matching "${searchQuery}"`
          : "You don't have any tasks yet. Click 'New Todo' to get started!"}
      </p>
      {!searchQuery && (
        <button
          onClick={onCreateClick}
          className="mt-6 text-violet-400 hover:text-violet-300 text-sm font-medium transition"
        >
          + Create your first task
        </button>
      )}
    </div>
  );
}
