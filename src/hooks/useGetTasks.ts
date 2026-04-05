import { fetchTasks } from "@/api/tasks.api";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (enabled: boolean) => {
  return useQuery({
    queryKey: ["fetch-tasks"],
    queryFn: fetchTasks,
    enabled,
  });
};
