import { Box, Typography } from "@mui/material";

const Header = ({ totalTasks }: { totalTasks: number }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          KANBAN BOARD
        </Typography>
        <Typography variant="subtitle2" component="h1">
          {`${totalTasks} tasks`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
