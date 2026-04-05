import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/models";

const priorityColors = {
  high: "error",
  medium: "warning",
  low: "success",
} as const;

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `task-${task.id}`,
    });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(15,23,42,0.08)",
        border: "1px solid rgba(15,23,42,0.08)",
        touchAction: "none",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {task.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          ></Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line" }}
        >
          {task.description}
        </Typography>
        {task.priority ? (
          <Chip
            label={task.priority.toUpperCase()}
            color={priorityColors[task.priority]}
            size="small"
            sx={{ borderRadius: "3px" }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
