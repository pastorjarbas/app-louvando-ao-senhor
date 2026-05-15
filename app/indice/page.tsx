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
    <main className="min-h-screen bg-gray-100 pb-10">
      <header className="bg-blue-900 px-4 py-6 text-white shadow-md">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50"
            >
              🏠 Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold">
            Índice Numérico
          </h1>

          <p className="mt-2 text-blue-100">
            Escolha o número do hino para abrir a letra.
          </p>
        </div>
      </header>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl">
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
      </section>
    </main>
  );
}