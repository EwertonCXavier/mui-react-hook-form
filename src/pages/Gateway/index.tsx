import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.css';
import { IFormInput, IFormInputKeys } from '../../interface';
import { TextFieldComponent } from '../../components/TextFieldComponent';
import { SnackbarComponent } from '../../components/Snackbar';
import { useNavigate, useParams } from 'react-router-dom';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import api from '../../service/api';

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    gatewayId: yup.string().required(),
    toggle: yup.boolean().required(), // converts the boolean into a string
  })
  .required();

export const Gateway = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      gatewayId: '',
      toggle: false,
    },
  });

  const params = useParams();
  // Responsible for controlling the toast state
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const retrieveGatewayById = useCallback(
    async (id: number | string) => {
      // Makes the api call to get the current gateway in the application
      const {
        data,
      }: {
        data: IFormInput;
      } = await api.getGatewayById(id);
      // Makes a loop and inserts the data into the fields
      Object.keys(data).forEach((key: string) => {
        setValue(key as IFormInputKeys, data[key as IFormInputKeys], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    },
    [setValue],
  );

  useEffect(() => {
    if (params?.id) {
      retrieveGatewayById(params?.id);
    }
  }, [retrieveGatewayById, params]);

  const theme = useTheme();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (params?.id) {
        // Tries the api call for the update process
        await api.updateGatewayById(params?.id, data);
      } else {
        // Saves the data on the json-server mock
        await api.createGateway(data);
        // Resets after submission
        reset();
      }
      // Opens the toast
      // After all the steps, resets the form
      setIsToastOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsToastOpen(false);
  };

  const handleManageButtonClick = useCallback(() => {
    navigate('/manage-gateways');
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: theme.spacing(9),
        }}
      >
        <Typography variant="h5">Gateway Page</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleManageButtonClick}
        >
          Manage
        </Button>
      </Box>
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldComponent
          label={'Name'}
          name={'name'}
          marginDirection={'mt'}
          control={control}
          errors={errors}
        />
        <TextFieldComponent
          label={'Description'}
          name={'description'}
          marginDirection={'mt'}
          control={control}
          errors={errors}
        />
        <TextFieldComponent
          label={'Gateway Id'}
          name={'gatewayId'}
          marginDirection={'my'}
          control={control}
          errors={errors}
        />
        {/* Toggle component */}
        <ToggleSwitch control={control} label={'Toggle'} name={'toggle'} />
        <Button type="submit" variant="contained">
          {params?.id ? 'Update' : 'Register'}
        </Button>
      </Box>

      {/* Snackbar here */}
      <SnackbarComponent
        duration={6000}
        label={
          params?.id
            ? 'Gateway updated successfully'
            : 'Gateway registered successfully'
        }
        open={isToastOpen}
        onClose={handleCloseToast}
      />
    </Box>
  );
};
