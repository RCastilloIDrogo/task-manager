"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await api.get(`tasks/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data.results)) {
        setTasks(res.data.results);
        setError(null);
      } else {
        setTasks([]);
        setError("No se pudieron obtener las tareas.");
      }
    } catch (err) {
      console.error("Error al obtener tareas:", err);
      setError("Sesión expirada o error al conectar.");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const eliminar = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">📋 Mis Tareas</h1>
        <button
          className="text-sm text-gray-400 hover:text-white underline"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded mb-6"
        onClick={() => router.push("/tasks/new")}
      >
        + Nueva Tarea
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-700 rounded-lg p-5 bg-gray-900 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-white mb-1">
                {task.title}
              </h2>
              <p className="text-gray-300">{task.description}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => router.push(`/tasks/${task.id}`)}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminar(task.id)}
                  className="text-sm text-red-400 hover:text-red-300 underline"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !error ? (
        <p className="text-gray-400">No hay tareas disponibles.</p>
      ) : null}

      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="text-sm px-4 py-2 border border-gray-600 rounded hover:bg-gray-700"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="text-sm px-4 py-2 border border-gray-600 rounded hover:bg-gray-700"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
