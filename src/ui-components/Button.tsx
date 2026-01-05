import { Button, styled } from '@mui/material';

export const SquareButton = styled(Button)(({ theme }) => ({
  background: theme.palette.background.default + '!important',
  border: `1px solid ${theme.palette.primary.dark}`,
  color: theme.palette.primary.main,
  borderRadius: '8px',
  padding: '0',
  width: '40px',
  height: '40px',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
}));
