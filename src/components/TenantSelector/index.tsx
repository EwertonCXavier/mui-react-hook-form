import {
  Box,
  ClickAwayListener,
  Container,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  useTheme,
} from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { ITenantSelector } from '../../interface';

export const TenantSelector = ({
  options,
  handleToggle,
  anchorRef,
  selectedIndex,
  open,
  handleClose,
  handleMenuItemClick,
}: ITenantSelector) => {
  const theme = useTheme();
  return (
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
                Hana Electronics
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
                        onClick={(event) => handleMenuItemClick(event, index)}
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
  );
};
