import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box>
      <Typography variant="h4">
        Dashboard
      </Typography>

      <Typography mt={2}>
        Welcome, {user?.name}
      </Typography>
    </Box>
  );
};

export default Dashboard;