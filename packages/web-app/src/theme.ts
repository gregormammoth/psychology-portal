import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      50: '#f7faf0',
      100: '#eff5e1',
      200: '#dfebc3',
      300: '#cfe1a5',
      400: '#bfd787',
      500: '#afcd69', // Main pastel green-yellow
      600: '#8ca454',
      700: '#697b3f',
      800: '#46522a',
      900: '#232915',
      main: '#afcd69', // Using 500 as main
      light: '#dfebc3', // Using 200 as light
      dark: '#697b3f', // Using 700 as dark
      contrastText: '#232915', // Using 900 for contrast
    },
    secondary: {
      50: '#faf7f0',
      100: '#f5efe1',
      200: '#ebdfc3',
      300: '#e1cfa5',
      400: '#d7bf87',
      500: '#cdaf69', // Pastel yellow
      600: '#a48c54',
      700: '#7b693f',
      800: '#52462a',
      900: '#292315',
      main: '#cdaf69', // Using 500 as main
      light: '#ebdfc3', // Using 200 as light
      dark: '#7b693f', // Using 700 as dark
      contrastText: '#292315', // Using 900 for contrast
    },
    background: {
      default: '#f7faf0', // Using primary-50
      paper: '#ffffff',
    },
    text: {
      primary: '#232915', // Using primary-900
      secondary: '#46522a', // Using primary-800
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.5rem',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

export default theme; 