import { Alert, Snackbar } from '@mui/material';

interface ISnackBarComponent {
  open: boolean;
  duration?: number;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'right';
  type?: 'error' | 'success' | 'warning' | 'info';
  label: string;
}

export const SnackbarComponent: React.FC<ISnackBarComponent> = ({
  open,
  duration = 6000,
  onClose,
  verticalPosition = 'top',
  horizontalPosition = 'right',
  type = 'success',
  label,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {label}
      </Alert>
    </Snackbar>
  );
};
