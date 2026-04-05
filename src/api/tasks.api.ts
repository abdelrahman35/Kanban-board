import { Task } from "@/models";
import { axiosInstance } from "@/network";

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axiosInstance.get("/tasks");
  return data;
};

const createTask = async (task: Task) => {
  const res = await axiosInstance.post("/tasks", task);
  return res.data;
};

const updateTask = async (task: Task) => {
  const res = await axiosInstance.put(`/tasks/${task.id}`, task);
  return res.data;
};

const deleteTask = async (id: number) => {
  await axiosInstance.delete(`/tasks/${id}`);
};
export { fetchTasks, createTask, updateTask, deleteTask };
