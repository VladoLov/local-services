// schemas/category.ts
import { z } from "zod";

export const categoryEnum = z.enum([
  "cistac",
  "majstor",
  "elektricar",
  "vodoinstalater",
  "gradjevinar",
  "stolar",
  "limar",
  "automehanicar",
  "frizer",
  "kozmeticki_tehnicar",
  "cvecar",
  "dostavljac",
  "it_tehnicar",
  "knjigovoda",
  "pravnik",
  "instruktor_voznje",
  "fotograf",
  "elektricar_uredjaja",
  "zidar",
  "parketar",
  "ostalo",
]);

export type Category = z.infer<typeof categoryEnum>;

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "cistac", label: "Čistač/Čistačica" },
  { value: "majstor", label: "Majstor po kućama" },
  { value: "elektricar", label: "Električar" },
  { value: "vodoinstalater", label: "Vodoinstalater" },
  { value: "gradjevinar", label: "Građevinar" },
  { value: "stolar", label: "Stolar" },
  { value: "limar", label: "Limar" },
  { value: "automehanicar", label: "Automehaničar" },
  { value: "frizer", label: "Frizer/Frizerski salon" },
  { value: "kozmeticki_tehnicar", label: "Kozmetički tehničar" },
  { value: "cvecar", label: "Cvjećar/Cvjećarnica" },
  { value: "dostavljac", label: "Dostavljač" },
  { value: "it_tehnicar", label: "IT tehničar" },
  { value: "knjigovoda", label: "Knjigovođa" },
  { value: "pravnik", label: "Pravnik/Pravna usluga" },
  { value: "instruktor_voznje", label: "Instruktor vožnje" },
  { value: "fotograf", label: "Fotograf" },
  { value: "elektricar_uredjaja", label: "Serviser električnih uređaja" },
  { value: "zidar", label: "Zidar" },
  { value: "parketar", label: "Parketar" },
  { value: "ostalo", label: "Ostalo" },
];
