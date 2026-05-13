"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { hinos } from "@/lib/hinos";

export default function Page() {
  const params = useParams();
  const numero = String(params.numero);

  const hino = hinos.find((item) => item.numero === numero);

  const [tamanhoFonte, setTamanhoFonte] = useState(20);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    const salvos = localStorage.getItem("hinosFavoritos");

    if (salvos) {
      setFavoritos(JSON.parse(salvos));
    }
  }, []);

  if (!hino) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">
            Hino não encontrado
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-blue-900 px-4 py-2 text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  const estaFavorito = hino ? favoritos.includes(String(hino.numero)) : false;

  function salvarFavoritos(novosFavoritos: string[]) {
    setFavoritos(novosFavoritos);
    localStorage.setItem("hinosFavoritos", JSON.stringify(novosFavoritos));
  }

function alternarFavorito() {
  if (!hino) return;

  const numeroHino = String(hino.numero);

  if (estaFavorito) {
    salvarFavoritos(favoritos.filter((item) => item !== numeroHino));
  } else {
    salvarFavoritos([...favoritos, numeroHino]);
  }
}

  function diminuirFonte() {
    setTamanhoFonte((atual) => Math.max(16, atual - 2));
  }

  function aumentarFonte() {
    setTamanhoFonte((atual) => Math.min(34, atual + 2));
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <header className="bg-blue-900 px-4 py-6 text-white shadow-md">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-blue-100 hover:text-white"
          >
            ← Voltar
          </Link>

          <p className="text-blue-100">Hino {hino.numero}</p>

          <h1 className="mt-2 text-3xl font-bold">{hino.titulo}</h1>

          <button
            onClick={alternarFavorito}
            className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-900"
          >
            {estaFavorito
              ? "★ Remover dos favoritos"
              : "☆ Adicionar aos favoritos"}
          </button>

          <div className="mt-4 flex flex-wrap gap-2">
            {hino.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
          <div
            className="prose max-w-none text-gray-800"
            style={{ fontSize: `${tamanhoFonte}px` }}
          >
            <div className="whitespace-pre-line">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-6 leading-relaxed">{children}</p>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                }}
              >
                {hino.letra}
              </ReactMarkdown>
            </div>
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

<Link
  href="/indice"
  className="flex flex-col items-center text-sm text-gray-700"
>
  <span>#️⃣</span>
  <span>Números</span>
</Link>

          <button
            onClick={diminuirFonte}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <span>A-</span>
            <span>Menor</span>
          </button>

          <button
            onClick={aumentarFonte}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <span>A+</span>
            <span>Maior</span>
          </button>

          <button
            onClick={alternarFavorito}
            className="flex flex-col items-center text-sm text-gray-700"
          >
            <span>{estaFavorito ? "★" : "☆"}</span>
            <span>Favorito</span>
          </button>
        </div>
      </footer>
    </main>
  );
}