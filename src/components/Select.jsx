import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect from "@mui/material/Select";
import React from "react";

export default function Select({ driver, setFilters, initData }) {
  const handleChange = (event) => {
    setFilters((prev) => ({ ...prev, driver_eq: event.target.value }));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Drivers</InputLabel>
        <MUISelect value={driver} label="Drivers" onChange={handleChange}>
          <MenuItem value="All">All</MenuItem>
          {initData
            .filter(
              (item, i, items) =>
                items.findIndex((b) => b.driver === item.driver) === i
            )
            .map((item) => (
              <MenuItem
                key={item.driver}
                value={item.driver}
                sx={{ textTransform: "uppercase" }}
              >
                {item.driver}
              </MenuItem>
            ))}
        </MUISelect>
      </FormControl>
    </Box>
  );
}
