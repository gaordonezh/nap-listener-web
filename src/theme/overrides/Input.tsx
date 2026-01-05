// ----------------------------------------------------------------------

import { type Theme } from '@mui/material';

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: theme.palette.background.default,

          '& fieldset': {
            borderColor: theme.palette.divider,
          },

          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
            borderRadius: '0',
          },
        },
      },
      defaultProps: {},
    },
  };
}
