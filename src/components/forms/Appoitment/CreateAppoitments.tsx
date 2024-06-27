'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Appoitment/FormInputs";
import {postAppointment} from "@/services/AppointmentServices";


export function AppointmentForm (props): React.JSX.Element {

  const [dataToSend, setDataToSend] = React.useState({});

  const saveAppointment= () => {
    postAppointment(dataToSend).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  return (
      <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
        <FormInputs setDataToSend={setDataToSend} />

        <Divider />

        <Button variant="contained"
                onClick={() => {
                  saveAppointment();
                }}
        >Crear Cita
        </Button>
      </Stack>
  );
}
