import Link from "next/link";
import { hinos } from "@/lib/hinos";

export const metadata = {
  title: "Índice Numérico | Louvando ao Senhor",
};

export default function IndicePage() {
  const hinosOrdenados = [...hinos].sort(
    (a, b) => Number(a.numero) - Number(b.numero)
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Índice Numérico
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Escolha o número do hino para abrir a letra.
        </p>

        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {hinosOrdenados.map((hino) => (
            <Link
              key={hino.numero}
              href={`/hinos/${encodeURIComponent(hino.numero)}`}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-center text-sm font-bold text-gray-800 shadow-sm transition hover:bg-gray-100"
              title={hino.titulo}
            >
              {hino.numero}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}