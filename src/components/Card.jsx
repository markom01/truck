import {
  Avatar,
  Card as MUICard,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Card({ item, setData }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MUICard
      sx={{
        "& .MuiCardContent-root:nth-of-type(n)": { pb: 1 },
        borderRadius: 0,
        borderBottom: "1px solid",
        borderBottomColor: "grey.300",
        boxShadow: "none",
        minHeight: 70,
      }}
    >
      <CardHeader
        sx={{ pb: 0, pt: 1, "& span": { fontWeight: "500" } }}
        avatar={
          <Avatar
            sx={{
              bgcolor: "success.light",
              width: 30,
              height: 30,
              typography: "caption",
            }}
          >
            DRV
          </Avatar>
        }
        title={item.driver}
      ></CardHeader>
      <CardContent sx={{ pb: 0, pt: 1 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Stack direction="row" gap={1} sx={{ mr: 1, alignItems: "center" }}>
            <Typography sx={{ whiteSpace: "no-wrap" }} variant="caption">
              Vehicle: {item.vehicleNum} - {item.vehicleLabel}
            </Typography>
            {/* <IconButton
              onClick={() => {
                setIsVisible((prev) => !prev);
                // setData((prev) => prev.filter((d) => d.id !== item.id));
              }}
            >
              {isVisible ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </IconButton> */}
          </Stack>
          <Typography variant="caption">Speed: {item.speed} mph</Typography>
        </Stack>
      </CardContent>
    </MUICard>
  );
}
