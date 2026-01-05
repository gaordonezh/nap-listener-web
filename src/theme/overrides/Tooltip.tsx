// ----------------------------------------------------------------------

import { type Theme } from '@mui/material';

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  };
}
