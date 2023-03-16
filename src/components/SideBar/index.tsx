import React, { useCallback, useRef, useState } from 'react';
import BasicButtons from '../BasicButtons';
import ToggleTheme from '../ToggleTheme';
import { Box, useMediaQuery, useTheme, Drawer } from '@mui/material';
import { TenantSelector } from '../TenantSelector';

interface ISideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<ISideBarProps> = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const options = ['One', 'Two', 'Three'];

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
      setSelectedIndex(index);
      setOpen(false);
    },
    [],
  );

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current?.contains(event?.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Drawer open={true} variant={smDown ? 'temporary' : 'permanent'}>
        <Box
          sx={{
            width: '280px',
            height: '100%',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1C2536',
          }}
        >
          {/* Add here the selector */}
          <TenantSelector
            anchorRef={anchorRef}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            handleToggle={handleToggle}
            open={open}
            options={options}
            selectedIndex={selectedIndex}
          />
          <BasicButtons />
          <ToggleTheme />
        </Box>
      </Drawer>
    </div>
  );
};
export default SideBar;
