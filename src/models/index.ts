export interface TaskStore {
  currentModal: TCurrentModal;
  search: string | undefined;
  actions: {
    setCurrentModal: (modal: TCurrentModal) => void;
    setSearch: (search: string | undefined) => void;
  };
}

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority?: Priority;
};

export type CreateTaskInput = Omit<Task, "id">;

export type Status = "backlog" | "in_progress" | "review" | "done";

export type TCurrentModal = "add" | "edit" | "un-set";
