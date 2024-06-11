"use client";
import { Box, Paper } from "@mui/material";

const ForgotPassword = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <h2>Dashboard</h2>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
