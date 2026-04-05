import { fetchTasks } from "@/api/tasks.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (enabled: boolean) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled,
  });
};
