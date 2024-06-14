'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

export function CreateUser(): React.JSX.Element {


  return (
      <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
        <FormControl fullWidth>
          <InputLabel>Nombre</InputLabel>
          <OutlinedInput label="name" name="name" type="text" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Apellido</InputLabel>
          <OutlinedInput label="lastname" name="lastname" type="text" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Cedula</InputLabel>
          <OutlinedInput label="dni" name="dni" type="string" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Telefono</InputLabel>
          <OutlinedInput label="phone" name="phone" type="string" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Email</InputLabel>
          <OutlinedInput label="email" name="email" type="email" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Direccion</InputLabel>
          <OutlinedInput label="direction" name="direction" type="string" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Contraseña</InputLabel>
          <OutlinedInput label="Password" name="password" type="password" />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Confirmar Contraseña</InputLabel>
          <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
        </FormControl>

        <Divider />

        <Button variant="contained">Agregar</Button>
      </Stack>
  );
}
