import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";

export default function Layout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <Stack direction={"row"} sx={{ height: "100vh", width: "100vw" }}>
      {isExpanded && <Nav />}

      <Stack width={"100%"}>
        <Header setIsExpanded={setIsExpanded} />
        <Box component="main" height="100%">
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
