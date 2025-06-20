"use client";

import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NuevaTarea() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const guardar = async () => {
    const token = localStorage.getItem("token");
    await api.post(
      "tasks/",
      { title, description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    router.push("/tasks");
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Crear nueva tarea</h1>
      <input
        className="border p-2 mb-2 block"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 mb-2 block"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={guardar} className="bg-green-600 text-white px-4 py-2">
        Guardar
      </button>
    </div>
  );
}
