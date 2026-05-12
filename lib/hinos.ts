import dados from "@/data/hinos.json";

export type Hino = {
  numero: string;
  titulo: string;
  tags: string[];
  letra: string;
};

export const hinos: Hino[] = dados;