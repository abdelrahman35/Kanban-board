"use client";
import { Box, TextField } from "@mui/material";
import { useMemo } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useTaskStore } from "@/store";
import { Status } from "@/models";
import Header from "@/components/header";
import TaskColumn from "@/components/taskColumn";
import { useUpdateTask } from "@/hooks/useUpdateTask";

export default function Home() {
  const { data: tasks = [] } = useGetTasks(true);
  const search = useTaskStore((state) => state.search);
  const setSearch = useTaskStore((state) => state.actions.setSearch);

  const filtered = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(search?.toLowerCase() ?? ""),
    );
  }, [tasks, search]);

  const getByColumn = (status: Status) =>
    filtered.filter((task) => task.status === status);

  const updateTask = useUpdateTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;
    if (active.id === over.id) return;

    const taskId = String(active.id).replace("task-", "");
    const targetStatus = over.id as Status;
    const task = tasks.find((task) => String(task.id) === taskId);
    if (!task || task.status === targetStatus) return;

    updateTask.mutate({ ...task, status: targetStatus });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Header totalTasks={tasks.length} />
            <TextField
              label="Search "
              value={search ?? ""}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: "100%",
                maxWidth: 400,
                background: "#ffffff",
                borderRadius: 3,
                boxShadow: "0 1px 4px rgba(15,23,42,0.08)",
              }}
              size="small"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <TaskColumn title="Backlog" tasks={getByColumn("backlog")} />
            <TaskColumn
              title="In Progress"
              tasks={getByColumn("in_progress")}
            />
            <TaskColumn title="Review" tasks={getByColumn("review")} />
            <TaskColumn title="Done" tasks={getByColumn("done")} />
          </Box>
        </Box>
      </Box>
    </DndContext>
  );
}
