"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { hinos } from "@/lib/hinos";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const salvos = localStorage.getItem("hinosFavoritos");

    if (salvos) {
      setFavoritos(JSON.parse(salvos));
    }
  }, []);

  const hinosFavoritos = useMemo(() => {
    return hinos.filter((hino) => favoritos.includes(hino.numero));
  }, [favoritos]);

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-blue-900 px-4 py-6 text-white shadow-md">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-blue-100 hover:text-white"
          >
            ← Voltar
          </Link>

          <h1 className="text-3xl font-bold">Favoritos</h1>

          <p className="mt-2 text-blue-100">
            Hinos marcados para acesso rápido.
          </p>
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-md">
          {hinosFavoritos.length > 0 ? (
            <div className="space-y-3">
              {hinosFavoritos.map((hino) => (
                <Link
                  key={hino.numero}
                  href={`/hinos/${hino.numero}`}
                  className="block rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-500">
                    Hino {hino.numero}
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">
                    {hino.titulo}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {hino.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
              Nenhum hino favorito ainda.
            </div>
          )}
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-3xl justify-around py-3">
          <Link
            href="/"
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <span>🏠</span>
            <span>Início</span>
          </Link>

          <Link
            href="/favoritos"
            className="flex flex-col items-center text-sm font-semibold text-blue-900"
          >
            <span>⭐</span>
            <span>Favoritos</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}