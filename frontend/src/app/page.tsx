// src/app/page.tsx
"use client";

import { useEffect } from "react"; //Si hay pasa, sino no pasa - TOKEN
import { useRouter } from "next/navigation"; //Redirigir entre rutas

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return null;
}
