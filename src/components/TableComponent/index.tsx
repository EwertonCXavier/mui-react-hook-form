import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { Column, IFormInput } from '../../interface';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../service/api';
import { SnackbarComponent } from '../Snackbar';
import { ModalComponent } from '../ModalComponent';
import { useNavigate } from 'react-router-dom';

interface ITableComponent {
  columns: Column[];
  type: 'gateway';
}

export const TableComponent = ({ columns, type }: ITableComponent) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<IFormInput[]>([]);
  const [isDeleteNotificationOpen, setIsDeleteNotificationOpen] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState<number | string>(-1);
  const navigate = useNavigate();

  // Memoized variable responsible for having all api calls related to the options provided by the system
  const genericApiCall = useMemo(() => {
    return {
      gateway: {
        post: (data: IFormInput) => api.createGateway(data),
        get: () => api.getGateways(),
        delete: (id: number | string) => api.deleteGateway(id),
      },
    };
  }, []);

  // API call for updating the data of the table. It is called in the first render and on every update on the screen
  const updatePage = useCallback(async () => {
    const getPages = await genericApiCall[type]['get']();
    setData(getPages.data);
  }, [genericApiCall, type]);

  // Calls the data for the first render
  useEffect(() => {
    updatePage();
  }, [updatePage]);

  // Controls the current page to be rendered in the screen
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    [],
  );

  // Responsible for closing the modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Responsible for deleting an item
  const handleDeleteItem = useCallback(
    async (id: number | string) => {
      await api.deleteGateway(id);
      handleCloseModal();
      setIsDeleteNotificationOpen(true);
      updatePage();
    },
    [updatePage, handleCloseModal],
  );

  // Responsible for controlling the open modal state
  const handleOpenModal = useCallback(async (id: number | string) => {
    try {
      // Enables the popup exhibition
      setIdToBeDeleted(id);
      setIsModalOpen(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  background: '#fb0',
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column?.align || 'left'}
                  style={{
                    minWidth: column.minWidth || 170,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
              {/* These are the columns for the icons */}
              <TableCell
                align="center"
                style={{
                  minWidth: theme.spacing(2),
                }}
              ></TableCell>
              <TableCell
                align="center"
                style={{
                  minWidth: theme.spacing(2),
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataRow) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={dataRow.id}
                  >
                    {columns.map((column) => {
                      const value = dataRow[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'boolean' ? String(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <EditIcon
                        sx={{
                          color: '#1567BC',
                        }}
                        onClick={() => navigate(`/gateway/${dataRow['id']}`)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{
                          color: theme.palette.error.dark,
                        }}
                        onClick={() =>
                          handleOpenModal(dataRow['id'] as string | number)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteItem(idToBeDeleted)}
        data={{
          type: 'delete',
          title: 'Do you want to delete the current gateway?',
          content: "In case you press 'OK', this data will not be recovered.",
        }}
      />
      <SnackbarComponent
        type="error"
        open={isDeleteNotificationOpen}
        onClose={() => setIsDeleteNotificationOpen(false)}
        label="Delete process completed successfully"
      />
    </>
  );
};
