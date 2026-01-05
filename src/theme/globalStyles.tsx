// material
import { useTheme } from '@mui/material/styles';
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',

          '::-webkit-scrollbar': {
            width: '7px',
            height: '7px',
          },
          '::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
            borderRadius: '5px',
          },

          '::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.grey[600],
            borderRadius: '5px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[700],
          },
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        textarea: {
          '&::-webkit-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::-moz-placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&:-ms-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::placeholder': {
            color: theme.palette.text.disabled,
          },
        },

        img: { display: 'block', maxWidth: '100%' },

        // Lazy Load Img
        '.blur-up': {
          WebkitFilter: 'blur(5px)',
          filter: 'blur(5px)',
          transition: 'filter 400ms, -webkit-filter 400ms',
        },
        '.blur-up.lazyloaded ': {
          WebkitFilter: 'blur(0)',
          filter: 'blur(0)',
        },

        '.ant-notification': {
          zIndex: '9999',
        },
        '.MuiModal-root': {
          zIndex: '999 !important',
        },
        '.ant-table-thead > tr > th': {
          background: `${theme.palette.primary.main} !important`,
          color: 'white !important',
        },
        '.ant-table-content': {
          borderRadius: '15px',
          border: '1px solid #ddd',
        },
      }}
    />
  );
}
