import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#8C8C8C",
        padding: "1rem",
        color: "#0B0909",
        textAlign: "center",
        marginTop: "auto", 
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: "roboto" }}>
        &copy; {new Date().getFullYear()} Rentex. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
