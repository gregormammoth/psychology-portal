import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#afcd69', // Tailwind primary-500
      light: '#dfebc3', // Tailwind primary-200
      dark: '#697b3f', // Tailwind primary-700
      contrastText: '#232915', // Tailwind primary-900
    },
    secondary: {
      main: '#6b7280', // Tailwind gray-500
      light: '#9ca3af', // Tailwind gray-400
      dark: '#4b5563', // Tailwind gray-600
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#232915', // Tailwind primary-900
      secondary: '#4b5563', // Tailwind gray-600
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.dark',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.dark',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'text.secondary',
          '&.Mui-focused': {
            color: 'primary.main',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.dark',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.dark',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme; 