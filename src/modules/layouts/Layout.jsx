import { Box } from "@mui/material";
import React from "react";
import { Header } from "./Header";
import MiniDrawer from "./Drawer";
import {useTheme } from '@mui/material/styles';

export const Layout = () =>{
     const theme = useTheme();
      const [open, setOpen] = React.useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    return(
        <Box sx={{
            display: 'flex',
            flexDirection:'row'
        }}>
            <MiniDrawer open={open} handleDrawerClose={handleDrawerClose}/>
        </Box>
    )
}