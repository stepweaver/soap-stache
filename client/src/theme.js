import { createTheme } from '@mui/material/styles';

export const shades = {
  primary: {
    100: '#dbddd2',
    200: '#b7baa6',
    300: '#939879',
    400: '#6f754d',
    500: '#4b5320',
    600: '#3c421a',
    700: '#2d3213',
    800: '#1e210d',
    900: '#0f1106'
  },

  secondary: {
    100: '#e8dad0',
    200: '#d1b5a1',
    300: '#b98f71',
    400: '#a26a42',
    500: '#8b4513',
    600: '#6f370f',
    700: '#53290b',
    800: '#381c08',
    900: '#1c0e04'
  },

  neutral: {
    100: '#fcfae8',
    200: '#f9f5d1',
    300: '#f6f0ba',
    400: '#f3eba3',
    500: '#f0e68c',
    600: '#c0b870',
    700: '#908a54',
    800: '#605c38',
    900: '#302e1c'
  }
};

export const theme = createTheme({
  pallette: {
    primary: {
      main: shades.primary[500]
    },
    secondary: {
      main: shades.secondary[500]
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100]
    }
  },
  typography: {
    fontFamily: ['Fauna One', 'sans-serif'].join(','),
    fontSize: 11,
    h1: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 48
    },
    h2: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 36
    },
    h3: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 20
    },
    h4: {
      fontFamily: ['Cinzel', 'sans-serif'].join(','),
      fontSize: 14
    }
  }
});
