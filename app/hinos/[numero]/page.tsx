import Link from "next/link";
import { notFound } from "next/navigation";
import { hinos } from "@/lib/hinos";

type Props = {
  params: Promise<{
    numero: string;
  }>;
};

export default async function Page({
  params,
}: Props) {
  const { numero } = await params;

  const hino = hinos.find(
    (item) => item.numero === Number(numero)
  );

  if (!hino) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {/* TOPO */}
      <header className="bg-blue-900 px-4 py-6 text-white shadow-md">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-blue-100 hover:text-white"
          >
            ← Voltar
          </Link>

          <p className="text-blue-100">
            Hino {hino.numero}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {hino.titulo}
          </h1>

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

      {/* LETRA */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
          <div className="whitespace-pre-line text-lg leading-9 text-gray-800">
            {hino.letra}
          </div>
        </div>
      </section>

      {/* MENU INFERIOR */}
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
            <span>⭐</span>
            <span>Favorito</span>
          </button>

          <button className="flex flex-col items-center text-sm text-gray-700">
            <span>🔤</span>
            <span>Fonte</span>
          </button>
        </div>
      </footer>
    </main>
  );
}