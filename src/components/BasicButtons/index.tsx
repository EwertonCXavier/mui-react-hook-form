import Stack from '@mui/material/Stack';
import { Button, ThemeProvider, withStyles } from '@mui/material';
import { DarkTheme, LightTheme } from '../../themes';
import { ButtonComponent } from '../ButtonComponent';
import { useNavigate } from 'react-router-dom';

export default function BasicButtons() {
  const navigate = useNavigate();

  return (
    <Stack
      flexDirection="column"
      spacing={2}
      display="flex"
      alignItems="center"
    >
      <ThemeProvider theme={LightTheme} />
      <ButtonComponent
        onClick={() => navigate('/dashboard')}
        label="dashboard"
      />
      <ButtonComponent onClick={() => navigate('/')} label="gateways" />
      <ButtonComponent onClick={() => navigate('/devices')} label="devices" />
    </Stack>
  );
}
