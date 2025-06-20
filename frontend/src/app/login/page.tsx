"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem("token", res.data.access);
      router.push("/tasks");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Iniciar Sesión</h1>
      <input
        className="border p-2 mb-2 block"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-2 block"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Entrar
      </button>
    </div>
  );
}
