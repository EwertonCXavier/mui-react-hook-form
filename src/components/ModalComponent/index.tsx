import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo } from 'react';
import { Delete } from '@mui/icons-material';

interface IModalComponent {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    type: 'get' | 'post' | 'delete' | 'update';
    title: string;
    content?: string;
  };
}

export const ModalComponent: React.FC<IModalComponent> = ({
  open,
  onClose,
  onConfirm,
  data,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const iconToDisplay = useMemo(() => {
    return {
      delete: <Delete color={'error'} />,
    };
  }, []);
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {iconToDisplay['delete']} {data.title}
      </DialogTitle>
      {data?.content && (
        <DialogContent>
          <DialogContentText>{data.content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Disagree
        </Button>
        <Button onClick={onConfirm} autoFocus variant="contained" color="error">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
