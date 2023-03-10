import { Box, TextField, Typography, useTheme } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IFormInput, IFormInputKeys } from '../../interface';

interface ITextFieldComponent {
  name: IFormInputKeys;
  control: Control<IFormInput>;
  label: string;
  marginDirection?: 'mx' | 'my' | 'm' | 'mt';
  errors: FieldErrors<IFormInput>; // This is the general object (dict) for the errors. Probably, update it.
}

export const TextFieldComponent: React.FC<ITextFieldComponent> = ({
  name,
  control,
  label,
  marginDirection = 'my',
  errors,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        [marginDirection]: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(0.5),
      }}
    >
      {/* Sets the height for the content as 2 times (2x) the default gap */}
      <Box
        sx={{
          height: theme.spacing(2),
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Typography sx={{ color: '#ff0000', fontSize: 12 }}>{errors[name] && <>{label} is required!</>}</Typography>
      </Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} variant="outlined" label={label} />}
      />
    </Box>
  );
};
