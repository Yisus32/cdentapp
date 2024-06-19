'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Appoitment/FormInputs";

export function EditAppoitments(props): React.JSX.Element {
  return (

    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs data={props.data}/>

      <Divider />

      <Button variant="contained">Editar</Button>
    </Stack>
  );
}
