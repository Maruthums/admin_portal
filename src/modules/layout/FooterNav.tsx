import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';

const FooterNav: React.FC = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (location.pathname === "/"
    ) {
      setValue(0)
    }
    else if (location.pathname === "/bus") {
      setValue(1)
    }
    else if (location.pathname === "/image") {
      setValue(2)
    }
     else if (location.pathname === "/video") {
      setValue(3)
    }
  }, [location]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction label="Buses" icon={<DirectionsBusIcon />}
          component={Link}
          to="/bus"
        />
        <BottomNavigationAction label="Image" icon={<AccountCircleIcon />}
        component={Link}
          to="/image"
        />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />}  component={Link} to="/video"/>
      </BottomNavigation>
    </Paper>
  );
};

export default FooterNav;
