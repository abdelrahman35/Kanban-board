import { TaskStore } from "@/models";

export const InitialState: Omit<TaskStore, "actions"> = {
  currentModal: "un-set",
  search: "",
};
