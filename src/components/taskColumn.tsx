import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box, Button, Chip, Typography } from "@mui/material";
import AddTaskModal from "./addTaskModal";
import TaskCard from "./taskCard";
import { Task, Status } from "@/models";

const statusColors = {
  backlog: "primary",
  in_progress: "warning",
  review: "secondary",
  done: "success",
} as const;

const TaskColumn = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  const statusKey = title.toLowerCase().replace(" ", "_") as Status;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: statusKey });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: "100%",
        minWidth: 280,
        p: 3,
        background: isOver ? "#e0f2fe" : "#f8fafc",
        borderRadius: 3,
        border: `1px solid ${isOver ? "#38bdf8" : "rgba(148,163,184,0.2)"}`,
        boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "background 150ms ease, border-color 150ms ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tasks.length} tasks
          </Typography>
        </Box>
        <Chip
          label={title.toUpperCase()}
          color={statusColors[statusKey]}
          size="small"
        />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>

      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
        fullWidth
        sx={{
          color: "text.secondary",
          borderColor: "rgba(148,163,184,0.6)",
          borderStyle: "dashed",
          textTransform: "none",
          py: 1.5,
          mt: 1,
        }}
      >
        + Add task
      </Button>

      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStatus={statusKey}
      />
    </Box>
  );
};
export default TaskColumn;
