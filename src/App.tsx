import { Box } from "@mui/material";
import SideBar from "./components/SideBar/index";
import { RoutesApp } from "./routes";
import { AppThemeProvider } from "./components/context/ThemeContext";
import { DrawerProvider } from "./components/context";

export const App = () => {
  return (
    <>
      <AppThemeProvider>
        <DrawerProvider>
          <SideBar />
          <Box marginLeft="300px">
            <RoutesApp />
          </Box>
        </DrawerProvider>
      </AppThemeProvider>
    </>
  );
};
