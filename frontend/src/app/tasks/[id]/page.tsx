// Ver y editar una tarea
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/utils/api";

export default function EditarTarea() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTarea = async () => {
    try {
      const res = await api.get(`tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCargando(false);
    } catch (err) {
      console.error("Error al cargar tarea", err);
      setError("No se pudo cargar la tarea.");
      setCargando(false);
    }
  };

  const actualizar = async () => {
    if (!title.trim()) {
      setError("El título no puede estar vacío.");
      return;
    }

    try {
      await api.put(
        `tasks/${id}/`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensaje("Tarea actualizada correctamente.");
      setError("");
      setTimeout(() => router.push("/tasks"), 1200);
    } catch (err) {
      console.error("Error al actualizar tarea", err);
      setError("No se pudo actualizar la tarea.");
    }
  };

  useEffect(() => {
    fetchTarea();
  }, []);

  if (cargando) return <p className="p-10">Cargando tarea...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl mb-6">Editar Tarea #{id}</h1>

      {mensaje && <p className="text-green-500 mb-2">{mensaje}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <label className="block mb-1 font-semibold">Título</label>
      <input
        className="border border-white bg-transparent text-white p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />

      <label className="block mb-1 font-semibold">Descripción</label>
      <textarea
        className="border border-white bg-transparent text-white p-2 w-full mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />

      <div className="flex gap-4">
        <button
          onClick={actualizar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Guardar cambios
        </button>
        <button
          onClick={() => router.push("/tasks")}
          className="text-gray-400 underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
