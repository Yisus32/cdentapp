'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';

import { useSelection } from '@/hooks/use-selection';
import IconButton from "@mui/material/IconButton";
import {Trash} from "@phosphor-icons/react/dist/ssr/Trash";
import {Pencil} from "@phosphor-icons/react/dist/ssr/Pencil";
import {Eye} from "@phosphor-icons/react/dist/ssr/Eye";
import FormModal from "@/components/forms/Utils/FormModal";
import {EditUser} from "@/components/forms/Users/EditUser";
import Page from "@/app/dashboard/account/page";
import ClinicHistory from "@/components/dashboard/customer/ClinicHistory";
import internal from "stream";
import { deleteUser } from '@/services/UserServices';


function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  dni: string;
  role_id: number;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selected } = useSelection(rowIds);

  const [open, setOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [dataToEdit, setDataToEdit] = React.useState<Customer | null>(null);
  const handleOpen = (data: Customer) => {
    setOpen(true)
    setDataToEdit(data)
  };

  const handleViewOpen = (data: Customer) => {
    setViewOpen(true)
    setDataToEdit(data)
  }
  const handleClose = () => { setOpen(false); };
  const handleViewClose = () => { setViewOpen(false); };



 const userDelete = (id) => {
    deleteUser(id).then(function(response) {
      return response.text(); }).then(function(data) {
 }).catch(function(error) {console.error('Error:', error);
    });
  };


  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.lastname}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.dni}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.rol_id}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <IconButton onClick={ () => {
                          handleViewOpen(row)
                        }} >
                          <Eye weight="bold" />
                        </IconButton>
                      </Grid>

                      <Grid item xs={4}>
                        <IconButton onClick={ () => {
                          handleOpen(row)
                        }} >
                          <Pencil weight="bold" />
                        </IconButton>
                      </Grid>

                      <Grid item xs={4}>
                        <IconButton onClick={()=>{
                          userDelete(row.id)
                        }}>
                          <Trash weight="bold" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <FormModal form={<EditUser data={dataToEdit} setOpen={setOpen} />}
                 open={open}
                 handleClose={handleClose}
      />

      <FormModal form={<ClinicHistory userId={dataToEdit?.id} setOpen={setOpen}/>}
                 open={viewOpen}
                 handleClose={handleViewClose}
      />

    </Card>
  );
}
