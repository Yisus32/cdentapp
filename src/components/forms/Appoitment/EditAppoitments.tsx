'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Appoitment/FormInputs";
import {putAppointment} from "@/services/AppointmentServices";

export function EditAppoitments(props): React.JSX.Element {

  const [dataToSend, setDataToSend] = React.useState(props.data);

  const saveAppointment= () => {
    console.log(dataToSend, props.data.id);
    putAppointment(dataToSend, props.data.id).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs data={props.data} setDataToSend={setDataToSend}/>

      <Divider />

      <Button variant="contained" onClick={() => {
        saveAppointment();
      }}>Editar</Button>
    </Stack>
  );
}
