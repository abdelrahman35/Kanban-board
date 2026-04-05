import { Task } from "@/models";
import { axiosInstance } from "@/network";

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axiosInstance.get<Partial<Task>[]>("/tasks");
  return data.map((task) => {
    const column = (task as { column?: string }).column;
    return {
      ...task,
      status: task.status ?? column ?? "backlog",
      id: String(task.id),
    } as Task;
  });
};

const createTask = async (task: Omit<Task, "id">) => {
  const res = await axiosInstance.post("/tasks", task);
  return res.data;
};

const updateTask = async (task: Task) => {
  const res = await axiosInstance.put(`/tasks/${task.id}`, task);
  return res.data;
};

export { fetchTasks, createTask, updateTask };
