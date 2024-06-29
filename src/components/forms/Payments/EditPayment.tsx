'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Payments/FormInputs";
import {putPayment} from "@/services/PaymentServices";

export function EditPayment(props): React.JSX.Element {
  const [dataToSend, setDataToSend] = React.useState(props.data);

  const savePayment = () => {
    putPayment(dataToSend, props.data.id).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  return (

    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs data={props.data} setDataToSend={setDataToSend}/>

      <Divider />

      <Button variant="contained" onClick={() => {
        savePayment();
      }} >Editar</Button>
    </Stack>
  );
}
