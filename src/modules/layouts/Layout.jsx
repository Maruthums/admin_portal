import { Box } from "@mui/material";
import React from "react";
import MiniDrawer from "./Drawer";

export const Layout = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <MiniDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  )
}