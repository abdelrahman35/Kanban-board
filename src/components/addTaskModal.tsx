"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Status, Priority } from "@/models";
import { useCreateTask } from "../hooks/useCreateTask";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  defaultStatus: Status;
}

const priorityOptions: Priority[] = ["high", "medium", "low"];

const AddTaskModal = ({ open, onClose, defaultStatus }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const createTask = useCreateTask();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as Priority);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;

    await createTask.mutateAsync({
      title: title.trim(),
      description: description.trim(),
      status: defaultStatus,
      priority,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Task</DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          <TextField
            label="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="priority-label">Task priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Task priority"
              onChange={handlePriorityChange}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography color="text.secondary" variant="body2">
            This task will be added to the {defaultStatus.replace("_", " ")}{" "}
            column.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!title.trim()}>
            Add task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddTaskModal;
