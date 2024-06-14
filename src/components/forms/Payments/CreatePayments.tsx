'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const states = [
  { value: 'Transferencia', label: 'Transferencia' },
  { value: 'Efectivo', label: 'Efectivo' },
] as const;


export function PaymentsForm(): React.JSX.Element {
  return (

    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select defaultValue="Efectivo" label="State" name="state" variant="outlined">
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Monto</InputLabel>
        <OutlinedInput label="amount" name="amount" type="number" />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Fecha</InputLabel>
        <OutlinedInput label="payment date" name="paymentdate" type="date" />
      </FormControl>

      <Divider />

      <Button variant="contained">Pagar</Button>
    </Stack>
  );
}
