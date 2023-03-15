import { Button, List, Typography, styled } from '@mui/material';
import { useMemo } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import CloudIcon from '@mui/icons-material/Cloud';

export type buttonOptions = 'gateways' | 'devices' | 'dashboard';

interface IButtonComponentProps {
  label: buttonOptions;
  onClick?: () => void;
}

export type IRetrieveIcons = {
  [key in buttonOptions]: JSX.Element;
};

export const ButtonComponent = ({ label, onClick }: IButtonComponentProps) => {
  const retrieveIcon = useMemo<IRetrieveIcons>(() => {
    return {
      gateways: <RssFeedIcon sx={{ color: '#FFF' }} color="primary" />,
      dashboard: <GridViewIcon sx={{ color: '#FFF' }} color="primary" />,
      devices: <CloudIcon sx={{ color: '#FFF' }} color="primary" />,
    };
  }, []);

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

          ':hover': {
            bgcolor: '#1567BC',
            color: 'white',
          },
        }}
        variant="text"
        color="primary"
        onClick={onClick}
      >
        {retrieveIcon[label.toLowerCase() as buttonOptions]}

        <Typography fontSize="0.9rem" color="#FFF">
          {label}
        </Typography>
      </Button>
    </List>
  );
};
