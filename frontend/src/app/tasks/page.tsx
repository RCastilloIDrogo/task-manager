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
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Mis Tareas</h1>
        <button
          className="text-gray-500 underline"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 mb-4"
        onClick={() => router.push("/tasks/new")}
      >
        Nueva Tarea
      </button>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {tasks.length > 0
        ? tasks.map((task) => (
            <div key={task.id} className="border p-4 mb-2">
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <button
                onClick={() => router.push(`/tasks/${task.id}`)}
                className="text-blue-600 mr-2"
              >
                Ver
              </button>
              <button
                onClick={() => eliminar(task.id)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </div>
          ))
        : !error && <p>No hay tareas disponibles.</p>}

      <div className="mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="mr-2"
        >
          Anterior
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
