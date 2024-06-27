'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Download as DownloadIcon} from '@phosphor-icons/react/dist/ssr/Download';
import {Plus as PlusIcon} from '@phosphor-icons/react/dist/ssr/Plus';
import {Upload as UploadIcon} from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import type {Appointment} from "@/components/dashboard/integrations/appointments-table";
import {AppointmentsTable} from "@/components/dashboard/integrations/appointments-table";
import FormModal from "@/components/forms/Utils/FormModal";
import {AppointmentForm} from "@/components/forms/Appoitment/CreateAppoitments";
import {useEffect} from "react";
import {getAppointments} from "@/services/AppointmentServices";


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;


  const [open, setOpen] = React.useState(false);

   const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  useEffect (() => {
    getAppointments().then((data) => {
      setAppointments(data['appointments']);
    });
  }, []);

 const paginatedAppointment = applyPagination(appointments, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4"> Citas </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleOpen}>
            Add
          </Button>
        </div>
      </Stack>

      <AppointmentsTable
        count={paginatedAppointment.length}
        page={page}
        rows={paginatedAppointment}
        rowsPerPage={rowsPerPage}
      />

      <FormModal form={<AppointmentForm setOpen={setOpen}/>}
                 open={open}
                 handleClose={handleClose}
      />
    </Stack>
  );
}

function applyPagination(rows: Appointment[], page: number, rowsPerPage: number): Appointment[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
