import { create } from "zustand";

export const usePostStore = create((set) => ({
  title: "",
  body: "",
  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  resetForm: () => set({ title: "", body: "" }),
}));
