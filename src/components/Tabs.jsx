import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState } from "react";
import fetchData from "../functions/fetchData";
import Card from "./Card";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MyTabs({
  data,
  setData,
  setIsLoading,
  setIsRefetching,
  isRefetching,
  isLoading,
  setIsError,
}) {
  const [tabsValue, setTabsValue] = useState(0);
  const [search, setSearch] = useState("");

  const handleChangeTabs = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 370 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabsValue}
          onChange={handleChangeTabs}
          aria-label="basic tabs example"
        >
          <Tab label="Fleet" {...a11yProps(0)} />
          <Tab label="Routing" {...a11yProps(1)} />
          <Tab label="HOS" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabsValue} index={0}>
        <TextField
          fullWidth
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const json = await fetchData({
                params: { driver_contains: search },
                data,
                setIsLoading,
                setIsRefetching,
                setIsError,
              });
              setData(json);
            }
          }}
          value={search}
          id="outlined-search"
          label="Select driver"
          type="search"
          sx={{ mb: 1 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Stack height={650} sx={{ overflowY: "scroll" }}>
          {isRefetching || isLoading ? (
            <LinearProgress />
          ) : (
            data.map((item) => (
              <Card
                key={item.vehicleNum + item.vehicleLabel}
                item={item}
                setData={setData}
              />
            ))
          )}
        </Stack>
      </TabPanel>
      <TabPanel value={tabsValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabsValue} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
