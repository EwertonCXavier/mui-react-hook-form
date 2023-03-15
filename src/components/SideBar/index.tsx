import { Box, useMediaQuery, useTheme, Drawer } from "@mui/material";
import React from "react";
import BasicButtons from "../BasicButtons";
import ToggleTheme from "../ToggleTheme";
import { useAppThemeContext, useDrawerContext } from "../context";

interface ISideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<ISideBarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <div>
      <Drawer open={true} variant={smDown ? "temporary" : "permanent"}>
        <Box
          sx={{
            width: "300px",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1C2536",
          }}
        >
          <BasicButtons />
          <ToggleTheme />

          <Box
            width={theme.spacing(28)}
            height="20%"
            display="flex"
            flexDirection="column"
          ></Box>

          <Box height="20vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
            {children}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};
export default SideBar;
