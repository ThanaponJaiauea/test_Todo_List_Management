"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getAccessToken } from "@/utils/local-storage";
import validateTodoInput from "@/validators/validate-todolist";
import useAuth from "@/hooks/useAuth";
import TodoItem from "@/components/home/todoitem";
import TodoModal from "@/components/home/todomodal";
import TodoPagination from "@/components/home/todopagination";
import TodoEmpty from "@/components/home/todoempty";

const ITEMS_PER_PAGE = 3;
const INITIAL_FORM = { title: "", description: "" };

export default function HomePage() {
  const { authenticateUser } = useAuth();

  // UI State
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState({});

  // Data State
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // API Calls
  const fetchTodos = useCallback(async () => {
    try {
      const token = getAccessToken();
      const res = await fetch("/api/todolist/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTodos(data.todos || []);
    } catch (err) {
      console.error("fetchTodos error:", err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateTodoInput(formData);
    if (err) {
      setError(err);
      return;
    }
    setError({});
    setIsLoading(true);

    try {
      const token = getAccessToken();
      const url = isEdit
        ? `/api/todolist/edit/${formData.id}`
        : "/api/todolist/create";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEdit ? "Updated!" : "Created!");
        closeModal();
        fetchTodos();
      } else {
        const errData = await res.json();
        toast.error(errData.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getAccessToken();
      const res = await fetch(`/api/todolist/deleted/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Deleted!");
        fetchTodos();
      } else {
        const errData = await res.json();
        toast.error(errData.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleToggle = async (todo) => {
    try {
      const token = getAccessToken();
      const res = await fetch(`/api/todolist/edit/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (res.ok) fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Modal Helpers
  const openCreate = () => {
    setIsEdit(false);
    setFormData(INITIAL_FORM);
    setError({});
    setShowModal(true);
  };

  const openEdit = (todo) => {
    setIsEdit(true);
    setFormData({
      id: todo.id,
      title: todo.title,
      description: todo.description || "",
    });
    setError({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(INITIAL_FORM);
    setError({});
    setIsEdit(false);
  };

  // Derived Data
  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const currentItems = filteredTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Todos</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              {todos.length} tasks total
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-violet-600/20"
          >
            <Plus size={16} />
            New Todo
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search todos..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition"
          />
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {isFetching ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 className="animate-spin mb-2" size={30} />
              <p className="text-sm">Loading your tasks...</p>
            </div>
          ) : currentItems.length > 0 ? (
            currentItems.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isOwner={authenticateUser?.id === todo.userId}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))
          ) : (
            <TodoEmpty searchQuery={searchQuery} onCreateClick={openCreate} />
          )}
        </div>

        {/* Pagination */}
        <TodoPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal */}
      <TodoModal
        showModal={showModal}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
        error={error}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
