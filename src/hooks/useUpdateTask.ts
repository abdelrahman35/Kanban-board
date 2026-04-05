import { updateTask } from "@/api/tasks.api";
import { Task } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old: Task[] = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      );

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["tasks"], context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
