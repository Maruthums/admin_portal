import React, { useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Typography,
  useTheme,
  Tooltip,
  CssBaseline,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import MuiDrawer from "@mui/material/Drawer";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  GroupsOutlined,
  BadgeOutlined,
  SettingsOutlined,
  AssessmentOutlined,
  AssignmentInd,
  DescriptionOutlined,
  SpeakerNotesOutlined,
  Dashboard,
  DepartureBoard,
  Collections,
  VideoLibrary,
  AddToPhotos,
} from "@mui/icons-material";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import { color } from "../styles/color";
interface PageContentDTO {
  drawerWidth: number;
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  showSettingsOptions: boolean;
  setShowSettingsOptions: React.Dispatch<React.SetStateAction<boolean>>;
  showSurveysOptions: boolean;
  setShowSurveysOptions: React.Dispatch<React.SetStateAction<boolean>>;
  showUsersOption: boolean;
  setShowUsersOption: React.Dispatch<React.SetStateAction<boolean>>;
  showDashBoardsOptions: boolean;
  setShowDashBoardsOptions: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarEnable?: boolean;
}

const PageContent = ({
  drawerWidth,
  open,
  handleDrawerOpen,
  handleDrawerClose,
  showSettingsOptions,
  setShowSettingsOptions,
  showSurveysOptions,
  setShowSurveysOptions,
  showUsersOption,
  setShowUsersOption,
  showDashBoardsOptions,
  setShowDashBoardsOptions,
  sideBarEnable,
}: PageContentDTO) => {
  console.log('sideBarEnable', sideBarEnable);

  const theme = useTheme();
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const onCloseNavBar = React.useCallback(() => {
    setShowSettingsOptions(false);
    setShowUsersOption(false);
    handleDrawerClose();
  }, [handleDrawerClose]);

  const drawerStyle = {
    width: open ? 240 : 64, // Set your open and closed widths
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    "& .MuiDrawer-paper": {
      width: open ? 240 : 64,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard,
      }),
      overflowX: "hidden",
    },
    color: "#fff",
  };

  const displayStyle = {
    display: "none",
  };

  const handleDashboardClick = React.useCallback(
    (path: string) => {
      navigate(path);
    },
    []
  );

  // useEffect(() => {
  //   onCloseNavBar();
  // }, [isMobile]);

  return (
    <>
      {!isMobile &&
        <MuiDrawer
          variant="permanent"
          open={open}
          sx={[sideBarEnable ? drawerStyle : displayStyle, {
            '& .MuiDrawer-paper': {
              background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
              color: "#fff",
            }
          }]}
        >
          <DrawerHeader>
            <IconButton onClick={onCloseNavBar}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key={"Tools"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleDashboardClick("/")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Dashboard sx={{ color: color.White }} />
                </ListItemIcon>
                <ListItemText
                  primary={"DashBoard"}
                  sx={{ opacity: open ? 1 : 0, fontWeight: '600' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItemButton
              onClick={() => handleDashboardClick("/bus")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DepartureBoard sx={{ color: color.White }} />
              </ListItemIcon>
              <ListItemText
                primary={"Add Bus Info"}
                sx={{ opacity: open ? 1 : 0, fontWeight: '600' }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleDashboardClick("/image")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Collections sx={{ color: color.White }} />
              </ListItemIcon>
              <ListItemText
                primary={"Event Image"}
                sx={{ opacity: open ? 1 : 0, fontWeight: '600' }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleDashboardClick("/bus")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <VideoLibrary sx={{ color: color.White }} />
              </ListItemIcon>
              <ListItemText
                primary={"Event Video"}
                sx={{ opacity: open ? 1 : 0, fontWeight: '600' }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleDashboardClick("/AddUserInfo")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddToPhotos sx={{ color: color.White }} />
              </ListItemIcon>
              <ListItemText
                primary={"Add User Info"}
                sx={{ opacity: open ? 1 : 0, fontWeight: '600' }}
              />
            </ListItemButton>
            <ListItem key={"login"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={""}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {true ? <LogoutIcon /> : <LoginIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={true ? "Logout" : "Login"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </MuiDrawer>
      }
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ width: "100%" }}>
          <Outlet context={"true"} />
        </Box>
      </Box>
    </>
  );
};

export default PageContent;
