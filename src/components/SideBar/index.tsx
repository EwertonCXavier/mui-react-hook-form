import { Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import React from 'react';
import BasicButtons from '../BasicButtons';
import ToggleTheme from '../ToggleTheme';
import { useAppThemeContext, useDrawerContext } from '../context';

interface ISideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<ISideBarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <div>
      <Drawer open={true} variant={smDown ? 'temporary' : 'permanent'}>
        <Box
          sx={{
            width: '300px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1C2536',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
              alignItems: 'center',
              backgroundColor: '#1C2536',
            }}
          >
            <div>
              <h1>Teste</h1>
            </div>
            <BasicButtons />
            <ToggleTheme />
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};
export default SideBar;
