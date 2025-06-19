import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Header } from './Header';
const drawerList = [{
    lable: "DASHBOARD",
    path: '/'
},
{
    lable: "EVENTS",
    path: '/events'
},
]

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isSelect, setIsSelect] =React.useState('DASHBOARD')
    const navigate = useNavigate();
    const location = useLocation();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleClick = (item) => {
        setIsSelect(item.lable)
        navigate(item.path);
    };

    return (
        <Box sx={{ display: 'flex', position:'fixed' }}>
            <Box sx={{
                width: "250px",
                background: 'linear-gradient(to right bottom,rgb(32, 1, 65),#4949c7)',
                height: window.innerHeight - 60,
                m: 5,
                borderRadius: 3
            }}>
                <Box mt={5} />
                {drawerList?.map((item) =>
                    <ListItemButton onClick={() => handleClick(item)} sx={{
                        transition: 'all 0.3s ease',
                        width: '250px',
                        ":hover": {
                            backgroundColor: '#4949c7',
                            borderRadius: 3,
                            p: 1.5
                        },
                        backgroundColor: isSelect === item.lable ? '#4949c7' : null,
                        borderRadius: 3,
                        cursor: 'pointer'
                    }}>
                        <ListItem
                        >
                            <Typography sx={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                ":hover": {
                                    color: '#fff',
                                }
                            }}>
                                {item?.lable}
                            </Typography>
                        </ListItem>
                    </ListItemButton>
                )}
            </Box>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Header open={open} handleDrawerOpen={handleDrawerOpen} />
                <Box sx={{ width: "100%" }}>
                    <Outlet context={"true"} />
                </Box>
            </Box>
        </Box>
    );
}
