import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  IconButton,
  Button,
  Typography,
  styled,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ArrowBackIos, MenuOpen } from "@mui/icons-material";
import { color } from "../styles/color";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = (props: any) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: props.drawerWidth,
      width: `calc(100% - ${props.drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      setScreenWidth(window.innerWidth); // on mount

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMobile]);


  return (
    <AppBar position="fixed" open={false} sx={{
      background: "linear-gradient(135deg,#5f6f84,#8fa4df)",
      height: { sx: 60, md: 80 }
    }}>
      <Toolbar sx={{
        width: screenWidth
      }}>
        <Box
          sx={{
            width: 50,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={
              props.open ? props?.handleDrawerClose : props?.handleDrawerOpen
            }
            edge="start"
            sx={{
              marginRight: 3,
            }}
          >
            {props.open ? (
              <MenuOpen />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Typography>
          Logged in as{" "}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
