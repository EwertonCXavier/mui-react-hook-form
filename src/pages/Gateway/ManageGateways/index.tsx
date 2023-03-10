import { Box, Button, Paper, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { TableComponent } from '../../../components/TableComponent';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IItems } from '../../../interface';

export const ManageGateways = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const items = useMemo<IItems>(() => {
    return {
      gateways: [
        {
          id: 'name',
          label: 'Name',
          minWidth: theme.spacing(10),
        },
        {
          id: 'description',
          label: 'Description',
          minWidth: theme.spacing(20),
        },
        {
          id: 'gatewayId',
          label: 'Gateway Id',
          minWidth: theme.spacing(10),
        },
        {
          id: 'toggle',
          label: 'Toggle',
          minWidth: theme.spacing(5),
        },
      ],
      devices: [
        {
          id: 'name',
          label: 'Name',
          minWidth: theme.spacing(10),
        },
        {
          id: 'description',
          label: 'Description',
          minWidth: theme.spacing(20),
        },
        {
          id: 'gatewayId',
          label: 'Gateway Id',
          minWidth: theme.spacing(10),
        },
        {
          id: 'toggle',
          label: 'Toggle',
          minWidth: theme.spacing(5),
        },
      ],
      dashboard: [
        {
          id: 'name',
          label: 'Name',
          minWidth: theme.spacing(10),
        },
        {
          id: 'description',
          label: 'Description',
          minWidth: theme.spacing(20),
        },
        {
          id: 'gatewayId',
          label: 'Gateway Id',
          minWidth: theme.spacing(10),
        },
        {
          id: 'toggle',
          label: 'Toggle',
          minWidth: theme.spacing(5),
        },
      ],
    };
  }, [theme]);

  const handleBackButtonClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box>
        <Button
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
          }}
          variant="contained"
          color="secondary"
          onClick={handleBackButtonClick}
        >
          <ArrowBack />
          Back
        </Button>
      </Box>
      <Box
        component={'main'}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            /** maxWidth: theme.spacing(120), */
            width: '100%',
            mt: 2,
          }}
        >
          <TableComponent columns={items['gateways']} type="gateway" />
        </Paper>
      </Box>
    </Box>
  );
};
