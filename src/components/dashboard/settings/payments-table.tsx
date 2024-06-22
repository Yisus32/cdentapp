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
import { useSelection } from '@/hooks/use-selection';
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import { Pencil } from "@phosphor-icons/react/dist/ssr/Pencil";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import {Eye} from "@phosphor-icons/react/dist/ssr/Eye";
import {Customer} from "@/components/dashboard/customer/customers-table";
import FormModal from "@/components/forms/Utils/FormModal";
import {EditPayment} from "@/components/forms/Payments/EditPayment";
import {Appointment} from "@/components/dashboard/integrations/appointments-table";
import {EditAppoitments} from "@/components/forms/Appoitment/EditAppoitments";
import ViewPayments from "@/components/dashboard/settings/ViewPayments";

function noop(): void {
  // do nothing
}

const formatDate = (value) => {

  const date = new Date();
  return date.toISOString().split('T')[0];
}

export interface Payment {
  id: string;
  refCode: string;
  type: string;
  amount: number;
  createdAt: Date;
}

interface PaymentsTableProps {
  count?: number;
  page?: number;
  rows?: Payment[];
  rowsPerPage?: number;
}

export function PaymentsTable({
                                 count = 0,
                                 rows = [],
                                 page = 0,
                                 rowsPerPage = 0,
                               }: PaymentsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((payment) => payment.id);
  }, [rows]);

  const { selected } = useSelection(rowIds);

  const [open, setOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [dataToEdit, setDataToEdit] = React.useState<Customer | null>(null);

  const handleOpen = (data: Payment) => {
    setOpen(true)
    setDataToEdit(data)
  };

  const handleViewOpen = (data: Payment) => {
    setViewOpen(true)
    setDataToEdit(data)
  }

  const handleClose = () => { setOpen(false); };
  const handleViewClose = () => { setViewOpen(false); };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha de Pago</TableCell>
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
                      <Typography variant="subtitle2">{row.refCode}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{
                        row.type === 'transferencia' ? 'Transferencia' : 'Efectivo '
                          }</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.amount}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {dayjs(row.createdAt).format('MMM D, YYYY')}
                  </TableCell>
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
                        <IconButton onClick={() => {
                          handleOpen(row)
                        }}>
                          <Pencil weight="bold" />
                        </IconButton>
                      </Grid>

                      <Grid item xs={4}>
                        <IconButton>
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
      <FormModal form={<EditPayment data={dataToEdit}/>}
                 open={open}
                 handleClose={handleClose}
      />

      <FormModal form={<ViewPayments data={dataToEdit}/>}
                 open={viewOpen}
                 handleClose={handleViewClose}
      />


    </Card>
  );
}
