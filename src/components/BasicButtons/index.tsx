import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from '../../themes';
import { ButtonComponent } from '../ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import CloudIcon from '@mui/icons-material/Cloud';
import { buttonOptionsLabels } from '../../interface';

export type buttonOptions = 'gateways' | 'devices' | 'dashboard';

export type IRetrieveIcons = {
  [key in buttonOptions]: JSX.Element;
};

export default function BasicButtons() {
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const [sidebarButtons] = useState([
    {
      icon: <GridViewIcon sx={{ color: '#FFF' }} color="primary" />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <RssFeedIcon sx={{ color: '#FFF' }} color="primary" />,
      label: 'Gateways',
      path: '/gateways',
    },

    {
      icon: <CloudIcon sx={{ color: '#FFF' }} color="primary" />,
      label: 'Devices',
      path: '/devices',
    },
  ]);

  return (
    <Stack
      flexDirection="column"
      spacing={2}
      display="flex"
      alignItems="center"
    >
      <ThemeProvider theme={LightTheme} />
      {sidebarButtons.map((sidebarButton) => (
        <ButtonComponent
          key={sidebarButton.label}
          active={location.pathname === sidebarButton.path}
          onClick={() => navigate(sidebarButton.path)}
          label={sidebarButton.label as buttonOptionsLabels}
          data={sidebarButton}
        />
      ))}
    </Stack>
  );
}
