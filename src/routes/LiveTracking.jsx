import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, LinearProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import MyTabs from "../components/Tabs";
import fetchData from "../functions/fetchData";
import Layout from "../Layout";

export default function LiveTracking() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    (async () => {
      const json = await fetchData({
        data,
        setIsLoading,
        setIsRefetching,
        setIsError,
      });
      setData(json);
    })();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Layout>
      <Stack direction="row" height={"100%"}>
        <Box
          width="100%"
          height="100%"
          sx={{ bgcolor: "red.50", position: "relative" }}
        >
          {isLoading || isRefetching ? <LinearProgress /> : <Map data={data} />}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 25,
              bgcolor: "primary.main",
            }}
          >
            <IconButton onClick={handleClick}>
              {open ? (
                <ChevronRight sx={{ color: "white" }} />
              ) : (
                <ChevronLeft sx={{ color: "white" }} />
              )}
            </IconButton>
          </Box>
        </Box>

        {open && (
          <Box
            sx={{
              bgcolor: "grey.100",
              p: 2,
              borderLeft: "1px solid",
              borderLeftColor: "primary.main",
              zIndex: 1,
            }}
          >
            <MyTabs
              data={data}
              setData={setData}
              isRefetching={isRefetching}
              isLoading={isLoading}
              setIsError={setIsError}
              setIsRefetching={setIsRefetching}
              setIsLoading={setIsLoading}
            />
          </Box>
        )}
      </Stack>
    </Layout>
  );
}
