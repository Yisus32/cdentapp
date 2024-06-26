'use client'

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

import { useSelection } from '@/hooks/use-selection';
import IconButton from "@mui/material/IconButton";
import {Trash} from "@phosphor-icons/react/dist/ssr/Trash";
import {Pencil} from "@phosphor-icons/react/dist/ssr/Pencil";
import Grid from "@mui/material/Grid";
import {Eye} from "@phosphor-icons/react/dist/ssr/Eye";
import {Customer} from "@/components/dashboard/customer/customers-table";
import FormModal from "@/components/forms/Utils/FormModal";
import {EditAppoitments} from "@/components/forms/Appoitment/EditAppoitments";
import ViewAppoitments from "@/components/dashboard/integrations/ViewAppoitments";
import {deleteAppointment} from '@/services/AppointmentServices';



function noop(): void {
  // do nothing
}

export interface Appointment {
  id: string;
  date: string;
  patient: string;
  type: string;
  status: string;
  medicalProfessional: string;
  createdAt: Date;
}

interface AppointmentTableProps {
  count?: number;
  page?: number;
  rows?: Appointment[];
  rowsPerPage?: number;
  userData?: any;
}

export function AppointmentsTable({
                                 count = 0,
                                 rows = [],
                                 page = 0,
                                 rowsPerPage = 0,
                                 userData = []
                               }: AppointmentTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((appointment) => appointment.id);
  }, [rows]);


  const { selected } = useSelection(rowIds);
  const [open, setOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [dataToEdit, setDataToEdit] = React.useState<Customer | null>(null);
  const handleOpen = (data: Appointment) => {
    setOpen(true)
    setDataToEdit(data)
  };

  const handleViewOpen = (data: Appointment) => {
    setViewOpen(true)
    setDataToEdit(data)
  }

  const handleClose = () => { setOpen(false); };
  const handleViewClose = () => { setViewOpen(false); };

  const formatDateToDisplay = (date: string) => {
    const summonDate = new Date(date);

    return summonDate.toLocaleDateString('en-UK', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }

  const appointmentDelete = (id) =>{
    deleteAppointment(id).then (response => {
      window.location.reload();
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Medico</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              console.log(row)
              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{formatDateToDisplay(row.date)}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{userData.patient.lastname.toUpperCase()} {userData.patient.name.toUpperCase()}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{userData.doctor.lastname.toUpperCase()} {userData.doctor.name.toUpperCase()}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.state.toUpperCase()}</TableCell>
                  <TableCell>{row.status.toUpperCase()}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <IconButton onClick={() => {
                          handleViewOpen(row)
                        }}>
                          <Eye weight="bold" />
                        </IconButton>
                      </Grid>

                      <Grid item xs={4}>
                        <IconButton onClick={ () => {
                          handleOpen(row)
                        }}>
                          <Pencil weight="bold" />
                        </IconButton>
                      </Grid>

                      <Grid item xs={4}>
                        <IconButton
                        onClick={()=>{
                          appointmentDelete(row.id)
                        }}
                        >
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
      <FormModal form={<EditAppoitments data={dataToEdit} setOpen={setOpen}/>}
                 open={open}
                 handleClose={handleClose}
      />

      <FormModal form={<ViewAppoitments data={dataToEdit}/>}
                 open={viewOpen}
                 handleClose={handleViewClose}
      />
    </Card>
  );
}
