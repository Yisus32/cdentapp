'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Payments/FormInputs";
import {postPayment} from "@/services/PaymentServices";

export function PaymentsForm(props): React.JSX.Element {

  const [dataToSend, setDataToSend] = React.useState({});

  const savePayment = () => {
    postPayment(dataToSend).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs setDataToSend={setDataToSend} />

      <Divider />

      <Button
        variant="contained"
        onClick={() => {savePayment ();}} >
        Crear
      </Button>
    </Stack>
  );
}
