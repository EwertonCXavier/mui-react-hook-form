import { Box, FormControlLabel, Switch } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { IFormInput, IFormInputKeys } from '../../interface';

interface IToggleSwitch {
  name: IFormInputKeys;
  control: Control<IFormInput>;
  label: string;
}

export const ToggleSwitch: React.FC<IToggleSwitch> = ({
  name,
  control,
  label,
}) => {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            sx={{
              m: 0,
            }}
            control={<Switch {...field} checked={field['value'] as boolean} />}
            label={label}
            labelPlacement={'top'}
          />
        )}
      />
    </Box>
  );
};
