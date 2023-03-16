import React, { useCallback, useEffect, useRef, useState } from 'react';
import BasicButtons from '../BasicButtons';
import ToggleTheme from '../ToggleTheme';
import { useLocation } from 'react-router';
// import { useAppThemeContext, useDrawerContext } from '../context';
import {
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  ButtonGroup,
  Button,
  Container,
  Typography,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
} from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../context';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

interface ISideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<ISideBarProps> = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  // const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  // const { toggleTheme } = useAppThemeContext();

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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1C2536',
            }}
          >
            <Container
              sx={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '4px',
                padding: '8px 0',
              }}
              onClick={handleToggle}
              ref={anchorRef}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                      color="#fff"
                    >
                      Devias
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                      }}
                      color={theme.palette.primary.light}
                    >
                      {options[selectedIndex]}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <UnfoldMoreIcon />
                </Box>
              </Box>
            </Container>
            {open && (
              <Popper
                sx={{
                  zIndex: 1,
                  width: '100%',
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            )}
          </Box>
          <BasicButtons />
          <ToggleTheme />
        </Box>
      </Drawer>
    </div>
  );
};
export default SideBar;
