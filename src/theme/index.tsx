import { type ReactNode, useMemo } from "react";
// material
import { CssBaseline, type PaletteMode } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import shape from "./shape";
import { getPalette } from "./palette";
import typography from "./typography";
import componentsOverride from "./overrides";
import { getCustomShadows, getShadows } from "./shadows";

// ----------------------------------------------------------------------

interface IProps {
  children: ReactNode;
  mode: PaletteMode;
}

export default function ThemeConfig({ children, mode }: IProps) {
  const themeOptions: any = useMemo(
    () => ({
      palette: getPalette(mode),
      shape,
      typography,
      shadows: getShadows(mode),
      customShadows: getCustomShadows(mode),
      // components: componentsOverride({ ...getPalette(mode), mode }),
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);
  // @ts-expect-error DEFINED BUT IS EXTENSE
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
