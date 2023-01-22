import HomeIcon from "@mui/icons-material/Home";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import Layout from "../Layout";

export default function DriverLogs() {
  return (
    <Layout>
      <Stack height={"100%"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "grey.100",
            py: 2,
            px: 3,
            borderBlock: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Typography sx={{ ml: 1 }} component={"h1"} variant={"h5"}>
            Driver Logs
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              "& ol": {
                alignItems: "flex-end",
              },
            }}
          >
            <Link
              sx={{ display: "flex", alignItems: "center" }}
              underline="hover"
              color="inherit"
              href="/"
              typography={"body2"}
            >
              <HomeIcon sx={{ mr: 0.5, typography: "body2" }} />
              <Typography component="span" variant="body2">
                Home
              </Typography>
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/getting-started/installation/"
              aria-current="page"
              typography={"body2"}
            >
              Driver Logs
            </Link>
          </Breadcrumbs>
        </Box>
        <Box sx={{ p: 4, bgcolor: "grey.200" }} height="100%">
          <Box sx={{ p: 4, bgcolor: "white" }}>
            <Table />
          </Box>
        </Box>
      </Stack>
    </Layout>
  );
}
