import BuildIcon from "@mui/icons-material/Build";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LaptopIcon from "@mui/icons-material/Laptop";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import * as React from "react";
import { NavLink } from "react-router-dom";
import NavItemExpand from "./NavItemExpand";

export default function Nav() {
  const navData = [
    {
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      name: "Driver Logs",
      icon: <NoteAltIcon />,
      linkTo: "/",
    },
    {
      name: "Inspection Logs",
      icon: <FileCopyIcon />,
    },
    {
      name: "Undentifier Driving",
      icon: <CalendarTodayIcon />,
    },
    {
      name: "DVIR",
      icon: <BuildIcon />,
    },
    {
      name: "Live Tracking",
      icon: <VisibilityIcon />,
      linkTo: "/live-tracking",
    },
    {
      name: "Location History",
      icon: <HistoryIcon />,
    },
  ];

  const navExpandedData = [
    {
      name: "Reports",
      icon: <NoteAltIcon />,
    },
    {
      name: "Administration",
      icon: <LaptopIcon />,
    },
  ];

  return (
    <Box
      component={"nav"}
      sx={{
        bgcolor: "grey.100",
        borderRight: "1px solid",
        borderRightColor: "primary.main",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 5,
      }}
    >
      <List
        sx={{
          "& .MuiListItemButton-root": {
            width: 250,
          },
          "& .MuiListItemButton-root *": {
            typography: "body2",
            fontWeight: "300",
          },
          "& .MuiListItemButton-root.bigger *": {
            typography: "h6",
            fontWeight: "300",
          },
          "& .MuiListItemText-root span,a": {
            color: "text.secondary",
          },
          "& .MuiListItemIcon-root": { minWidth: "30px" },
        }}
      >
        {navData.map((item) => (
          <React.Fragment key={item.name}>
            <NavLink to={item.linkTo}>
              <ListItem disablePadding>
                <ListItemButton
                  className={item.name === "Home" ? "bigger" : null}
                >
                  <ListItemIcon
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
          </React.Fragment>
        ))}
        {navExpandedData.map((item) => (
          <NavItemExpand key={item.name} item={item} />
        ))}
      </List>
    </Box>
  );
}
