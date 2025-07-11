import * as React from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import Header from "./Header";
import PageContent from "./PageContent";
import FooterNav from "./FooterNav";

const drawerWidth = 150;

const AdminLayout = () => {
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme: any) =>
    theme?.breakpoints.between("sm", "md", "lg")
  );
  const isLargeScreen = useMediaQuery((theme: any) =>
    theme?.breakpoints.up("md")
  );
  const [open, setOpen] = React.useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = React.useState(false);
  const [showUsersOption, setShowUsersOption] = React.useState(false);
  const [showDashBoardsOptions, setShowDashBoardsOptions] =
    React.useState(true);
  const [isSidebarOpen, setSidebarOpen] = React.useState(isLargeScreen);
  const [showSurveysOptions, setShowSurveysOptions] = React.useState(false);

  const handleDrawerOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = () => {
    setShowSettingsOptions(false);
    setShowUsersOption(false);
    setShowDashBoardsOptions(false);
  };

  const isDrawerOpen = !isMobile ? open && isSidebarOpen : false;

  React.useEffect(() => {
    setSidebarOpen(isMedium || isLargeScreen);
  }, [isLargeScreen, isMedium]);

  React.useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(isMedium || isLargeScreen);
      setOpen(true);
    } else {
      setSidebarOpen(false);
      setOpen(false);
      handleDrawerClose();
    }
  }, [isLargeScreen, isMobile]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        open={isDrawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={() => {
          handleDrawerClose();
          handleClose();
        }}
      />
      <PageContent
        drawerWidth={drawerWidth}
        open={isDrawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        showSettingsOptions={showSettingsOptions}
        setShowSettingsOptions={setShowSettingsOptions}
        showSurveysOptions={showSurveysOptions}
        setShowSurveysOptions={setShowSurveysOptions}
        showUsersOption={showUsersOption}
        setShowUsersOption={setShowUsersOption}
        showDashBoardsOptions={showDashBoardsOptions}
        setShowDashBoardsOptions={setShowDashBoardsOptions}
        sideBarEnable={true}
      />
      {isMobile &&
        <FooterNav />
      }
    </Box>
  );
}

export default AdminLayout;