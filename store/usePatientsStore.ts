import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewMode = "grid" | "list";

interface PatientsStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const usePatientsStore = create<PatientsStore>()(
  persist(
    (set) => ({
      viewMode: "grid",
      setViewMode: (viewMode) => set({ viewMode }),
    }),
    { name: "patients-view" }
  )
);