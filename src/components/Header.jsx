import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Typography } from "@mui/material";
import * as React from "react";

export default function Header({ setIsExpanded }) {
  return (
    <Box
      component="header"
      sx={{ display: "flex", px: 3, justifyContent: "space-between" }}
    >
      <IconButton sx={{ my: 1 }} onClick={() => setIsExpanded((prev) => !prev)}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon sx={{ mr: 1, color: "gray" }} />
        <Typography color={"gray"}>John Doe</Typography>
      </Box>
    </Box>
  );
}
