import { Box, Button, List, Typography, useTheme } from '@mui/material';

export type buttonOptions = 'gateways' | 'devices' | 'dashboard';
export type labelOptions = 'Gateways' | 'Devices' | 'Dashboard';

interface IButtonComponentProps {
  label: labelOptions;
  onClick?: () => void;
  active?: boolean;
  data: any;
}

export const ButtonComponent = ({
  label,
  onClick,
  active = false,
  data,
}: IButtonComponentProps) => {
  const theme = useTheme();
  return (
    <List component="nav" sx={{ width: '100%' }}>
      <Button
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',

          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),

          ':hover': {
            bgcolor: '#1567BC',
            color: 'white',
          },
        }}
        variant="text"
        color="primary"
        onClick={onClick}
      >
        {data.icon}
        <Typography
          fontSize="0.875rem"
          color={theme.palette.primary.contrastText}
        >
          {label}
        </Typography>
      </Button>
    </List>
  );
};
