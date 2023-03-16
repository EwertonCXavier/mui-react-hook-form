import { createTheme } from "@mui/material";

export const DarkTheme = createTheme ({
  palette:{
    mode: 'dark',
    primary:{
      main:'#1C2536', //dark blue
      contrastText: '#FFFFFF',
    },
    secondary:{
      main:'#1567BC', // blue - button
      contrastText: '#FFFFFF',
    },
    background:{
      default: '#202124',
      paper: '#303134',
    },
  },
  typography: {
    allVariants:{
      color: 'white',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});