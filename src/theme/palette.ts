import { type PaletteMode } from '@mui/material';
import { alpha } from '@mui/material/styles';

declare module '@mui/material' {
  export interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  export interface Color {
    500_8?: string;
    500_12?: string;
    500_16?: string;
    500_24?: string;
    500_32?: string;
    500_48?: string;
    500_56?: string;
    500_80?: string;
  }
}
// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  lighter: '#eff5ff', // 50
  light: '#bfd7fe', // 200
  main: '#3b82f6', // 500
  dark: '#1d64d8', // 700
  darker: '#1e478a', // 900
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#fef9ec', // 50
  light: '#fad98d', // 200
  main: '#ef8611', // 500
  dark: '#af440e', // 700
  darker: '#752c12', // 900
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#B9F6CA',
  light: '#69F0AE',
  main: '#69F0AE',
  dark: '#00C853',
  darker: '#00C853',
  contrastText: '#fff',
};

const WARNING = {
  light: '#B9F6CA',
  main: '#FFE57F',
  dark: '#FFC107',
  contrastText: '#fff',
};

const ERROR = {
  lighter: '#fef3f2',
  light: '#ffccc8',
  main: '#f44336',
  dark: '#9d2017',
  contrastText: '#fff',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const lightPalette = {
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  background: {
    default: '#F4F6F8',
    paper: '#FFFFFF',
  },
  text: {
    primary: GREY[700],
    secondary: GREY[700],
  },
};

const darkPalette = {
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  background: {
    default: '#1c2128',
    paper: '#22272e',
  },
  text: {
    primary: GREY[300],
    secondary: GREY[400],
  },
};

export const getPalette = (mode: PaletteMode) => {
  const initialPalette = {
    mode,
    grey: GREY,
    gradients: GRADIENTS,
    chart: CHART_COLORS,
    divider: GREY[500_24],
    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };

  const palette = mode === 'light' ? lightPalette : darkPalette;

  return { ...initialPalette, ...palette };
};
