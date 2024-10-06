import { createTheme } from '@mui/material/styles';
import { grey, purple, blueGrey, blue, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
      paper: grey[50],
    },
    text: {
      primary: blueGrey[900],
      secondary: grey[500],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            opacity: 0.8,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});