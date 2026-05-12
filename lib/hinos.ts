import dados from "@/data/hinos.json";

export type Hino = {
  numero: number;
  titulo: string;
  tags: string[];
  letra: string;
};

export const hinos: Hino[] = dados;