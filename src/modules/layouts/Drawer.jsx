import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from './Header';
import { useMediaResponse } from '../hooks/useMediaResponse';

const drawerList = [{
    lable: "DASHBOARD",
    path: '/'
},
{
    lable: "EVENTS",
    path: '/events'
},
]

const drawerWidth = 250;

export default function MiniDrawer() {
    const { isMobile } = useMediaResponse()
    const [open, setOpen] = React.useState(false);
    const [isSelect, setIsSelect] = React.useState('DASHBOARD')
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen((pre) => !pre);
    };

    const handleClick = (item) => {
        setIsSelect(item.lable)
        navigate(item.path);
    };

    return (
        <Box sx={{ display: isMobile ? 'block' : 'flex', position: 'fixed' }}>
            <Box
                sx={{
                    width: `${drawerWidth}px`,
                    background: 'linear-gradient(to right bottom, rgb(32, 1, 65), #4949c7)',
                    height: window.innerHeight - 60,
                    ml: 5,
                    mb: 5,
                    mr: 3,
                    borderRadius: 3,
                    position: 'fixed',
                    left: 0,
                    top: 40,
                    transition: 'transform 0.4s ease-in-out',
                    transform: open ? 'translateX(0)' : 'translateX(-300px)',
                    zIndex: 999,
                }}
            >
                <Box mt={10} />
                {drawerList?.map((item) =>
                    <ListItemButton onClick={() => handleClick(item)} sx={{
                        transition: 'all 0.3s ease',
                        width: '250px',
                        ":hover": {
                            backgroundColor: '#a7a7ff',
                            borderRadius: 3,
                            p: 1.5,
                            mt: 1
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
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    ml: open ? `${drawerWidth + 50}px` : '16px',
                    transition: 'margin 0.4s ease-in-out',
                    width: '100%',

                }}>
                <Header open={open} handleDrawerOpen={handleDrawerOpen} />
                <Box sx={{ width: "100%" }}>
                    <Outlet context={"true"} />
                </Box>
            </Box>
        </Box>
    );
}
