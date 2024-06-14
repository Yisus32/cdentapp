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
  { value: 'Consulta', label: 'Consulta' },
  { value: 'Cirugia', label: 'Cirugia' },
  { value: 'Ortodoncia', label: 'Ortodoncia' },
  { value: 'Paronamica', label: 'Paronamica' },
] as const;

export function AppoitmentForm(): React.JSX.Element {
  return (
      <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
        <FormControl fullWidth>
          <InputLabel>Fecha</InputLabel>
          <OutlinedInput label="date" name="date" type="date"/>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Paciente</InputLabel>
          <OutlinedInput label="pacient" name="pacient" type="text" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Medico</InputLabel>
          <OutlinedInput label="doctor" name="doctor" type="text" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tipo</InputLabel>
          <Select defaultValue="Consulta" label="State" name="state" variant="outlined">
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider />

        <Button variant="contained">Crear Cita</Button>
      </Stack>
  );
}
