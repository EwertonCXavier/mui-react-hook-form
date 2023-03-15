import { Button, List, Typography } from '@mui/material';
import { buttonOptionsLabels } from '../../interface';

export type buttonOptions = 'gateways' | 'devices' | 'dashboard';

interface IButtonComponentProps {
  label: buttonOptionsLabels;
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
  return (
    <List component="nav" sx={{ width: '100%' }}>
      <Button
        sx={{
          px: 4,
          py: 2,
          display: 'flex',
          justifyContent: 'space-around',
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

        <Typography fontSize="0.9rem" color="#FFF">
          {data.label}
        </Typography>
      </Button>
    </List>
  );
};
