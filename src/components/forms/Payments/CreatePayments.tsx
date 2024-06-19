'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Payments/FormInputs";

export function PaymentsForm(): React.JSX.Element {
  return (

    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs />

      <Divider />

      <Button variant="contained">Crear</Button>
    </Stack>
  );
}
