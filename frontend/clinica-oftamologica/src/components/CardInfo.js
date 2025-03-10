import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CardInfo = ({ title, count, color }) => {
  return (
    <Card sx={{ backgroundColor: color, color: "#fff", textAlign: "center", padding: 2 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
