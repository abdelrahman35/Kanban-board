import { TaskStore, TCurrentModal } from "@/models";
import { create } from "zustand";
import { InitialState } from "./initialState";

export const useTaskStore = create<TaskStore>((set) => ({
  ...InitialState,
  actions: {
    setCurrentModal: (modal: TCurrentModal) => {
      set({ currentModal: modal });
    },
  },
}));
