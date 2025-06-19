import { Box, IconButton } from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";
import useWindowWidth from "../hooks/useWindowWidth";

const drawerWidth = 350;

export const Header = ({ open, handleDrawerOpen }) => {
    const windowWidth = useWindowWidth();
    return (
        <Box
            sx={{
                background: '#c5c5c5',
                height: '80px',
                width: open
                    ? windowWidth - drawerWidth
                    : windowWidth - 40,
                mt: 5,
                borderRadius: 2,
                backdropFilter: 'blur(15px)',
                transition: 'width 0.4s ease-in-out',
                mr: open ? `${drawerWidth + 50}px` : '35px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    height: '80px',
                    alignItems: 'center',
                    ml: 3,
                }}
            >
                <IconButton onClick={handleDrawerOpen}>
                    {open ?
                        <Menu sx={{ color: '#ffffff' }} />
                        :
                        <MenuOpen sx={{ color: '#ffffff' }} />
                    }
                </IconButton>
            </Box>
        </Box>
    );
};