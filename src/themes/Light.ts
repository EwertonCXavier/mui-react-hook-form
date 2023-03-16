  import { createTheme } from "@mui/material";


export const LightTheme = createTheme ({
  palette:{
    mode: 'light',
    primary:{
      main:'#1C2536', //dark blue
      contrastText: '#FFFFFF',
      light: '#9AA4AE',
    },
    secondary:{
      main:'#1567BC', // blue - button
      contrastText: '#FFFFFF',
    },
    background:{
      default: '#F7F6F3',
      paper: '#FFFFFF',
    },
  },
  typography: {
    allVariants:{
      color: 'black',
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