import { createTask } from "@/api/tasks.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskInput } from "@/models";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskInput) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      console.log("error creating task");
    },
  });
};
