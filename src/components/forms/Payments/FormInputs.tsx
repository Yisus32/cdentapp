'use client';

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const states = [
  { value: 'transaction', label: 'Transferencia' },
  { value: 'efectivo', label: 'Efectivo' },
] as const;

export function FormInputs(props): React.JSX.Element {

  const { data } = props;

  const [type, setType] = React.useState(data?.type);
  const [amount, setAmount] = React.useState(data?.amount);
  const [refCode, setRefCode] = React.useState(data?.refCode);
  const [createdAt, setCreatedAt] = React.useState(data?.createdAt);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select defaultValue="Efectivo"
                label="State"
                name="state"
                variant="outlined"
                value={type}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setType(event.target.value);
                }}>
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Codigo</InputLabel>
        <OutlinedInput label="refcode"
                       name="refcode"
                       type="number"
                       value={refCode}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setRefCode(event.target.value);
                       }}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Monto</InputLabel>
        <OutlinedInput label="amount"
                       name="amount"
                       type="number"
                       value={amount}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setAmount(event.target.value);
                       }}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Fecha</InputLabel>
        <OutlinedInput label="payment date"
                       name="paymentdate"
                       type="date"
                       value={createdAt}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setCreatedAt(event.target.value);
                        }}
        />
      </FormControl>
    </>
  );
}
