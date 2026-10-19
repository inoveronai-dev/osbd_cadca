import { loadKontakty } from "@/lib/content/load";

export type StaffPerson = {
  name: string;
  room?: string;
  phones?: readonly string[];
  emails?: readonly string[];
};

export type StaffGroup = {
  id: string;
  title: string;
  people: readonly StaffPerson[];
};

export const staffDirectory = loadKontakty().staffDirectory;
