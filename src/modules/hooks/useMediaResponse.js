import { useMediaQuery, useTheme } from '@mui/material';

export const useMediaResponse = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTab = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–899px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // ≥900px

  return { isMobile, isTab, isDesktop };
};
