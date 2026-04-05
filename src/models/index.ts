export interface TaskStore {
  currentModal: TCurrentModal;
  actions: {
    setCurrentModal: (modal: TCurrentModal) => void;
  };
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: Status;
};

export type Status = "backlog" | "in_progress" | "review" | "done";

export type TCurrentModal = "add" | "edit" | "un-set";
