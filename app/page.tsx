"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { hinos } from "@/lib/hinos";

export default function HomePage() {
  const [busca, setBusca] = useState("");

  const hinosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();

    return hinos.filter((hino) => {
      return (
        hino.numero.toString().includes(termo) ||
        hino.titulo.toLowerCase().includes(termo) ||
        hino.letra.toLowerCase().includes(termo) ||
        hino.tags.some((tag) => tag.toLowerCase().includes(termo))
      );
    });
  }, [busca]);

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <header className="bg-blue-900 px-4 py-6 text-white shadow-md">
        <div className="mx-auto max-w-3xl">
         <div className="mb-4 overflow-hidden rounded-2xl">
           <Image
             src="/banner-hinario.webp"
             alt="Banner do hinario"
             width={1600}
             height={500}
             className="h-auto w-full object-cover"
             priority
          />
        </div>

          <h1 className="text-center text-3xl font-bold">
            Louvando ao Senhor
          </h1>

          <p className="mt-2 text-center text-blue-100">
            Hinário digital da igreja
          </p>
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-6">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por número, título ou palavra..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            {hinosFiltrados.length > 0 ? (
              hinosFiltrados.map((hino) => (
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
              ))
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
                Nenhum hino encontrado.
              </div>
            )}
          </div>
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

          <button className="flex flex-col items-center text-sm text-gray-700">
            <span>🔎</span>
            <span>Buscar</span>
          </button>

          <button className="flex flex-col items-center text-sm text-gray-700">
            <span>📖</span>
            <span>Hinos</span>
          </button>

          <button className="flex flex-col items-center text-sm text-gray-700">
            <span>⭐</span>
            <span>Favoritos</span>
          </button>
        </div>
      </footer>
    </main>
  );
}