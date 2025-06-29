import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Close } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

interface BasicModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export default function BasicModal({ children, open, setOpen }: BasicModalProps) {
  const isMobile = useMediaQuery((theme: any) => theme?.breakpoints.down("sm"));

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          position: 'relative',
          width: isMobile ? '300px' : '800px',
        }}
      >
        <Box
          component="button"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            border: 'none',
            background: 'transparent',
            fontSize: '1.25rem',
            cursor: 'pointer',
          }}
        >
          <Close />
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
