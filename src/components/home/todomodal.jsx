import { Loader2 } from "lucide-react";
import { Input } from "@/components/Input";

export default function TodoModal({
  showModal,
  isEdit,
  formData,
  setFormData,
  error,
  isLoading,
  onSubmit,
  onClose,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <form
        onSubmit={onSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-lg font-bold mb-5 text-white">
          {isEdit ? "Edit Todo" : "New Todo"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="label_input">Title</label>
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              error={error.title}
            />
          </div>
          <div>
            <label className="label_input">Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              placeholder="Add some details..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition disabled:opacity-50 flex justify-center items-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : isEdit ? (
              "Save changes"
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
