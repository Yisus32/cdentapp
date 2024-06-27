'use client';

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";



const roles = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Doctor' },
  { value: 3, label: 'Paciente' },
] as const;


export function FormInputs(props): React.JSX.Element {
  const { data } = props;

  const [name, setName] = React.useState(data?.name);
  const [lastname, setLastname] = React.useState(data?.lastname);
  const [dni, setDni] = React.useState(data?.dni);
  const [phone, setPhone] = React.useState(data?.phone);
  const [email, setEmail] = React.useState(data?.email);
  const [address, setAddress] = React.useState(data?.address);
  const [role, setRole] = React.useState(data?.role);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  useEffect(() => {
    const data = {
      name: name,
      lastname: lastname,
      dni: dni,
      phone: phone,
      email: email,
      address: address,
      rol_id: role,
      password: password
    }

    props?.setDataToSend(data);

  }, [name, lastname, dni, phone, email, address, role, password]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Nombre</InputLabel>
        <OutlinedInput label="name" name="name" type="text" value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Apellido</InputLabel>
        <OutlinedInput label="lastname" name="lastname" type="text" value={lastname} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLastname(event.target.value);
        }} />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Cedula</InputLabel>
        <OutlinedInput label="dni" name="dni" type="string" value={dni} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDni(event.target.value);
        }} />
      </FormControl>

      <FormControl fuullWidth>
        <InputLabel>Rol</InputLabel>
        <Select value={role} onChange={
          (event: React.ChangeEvent<{ value: unknown }>) => {
            setRole(event.target.value as number);
          }
        }>
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Telefono</InputLabel>
        <OutlinedInput label="phone" name="phone" type="string" value={phone} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhone(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Email</InputLabel>
        <OutlinedInput label="email" name="email" type="email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Direccion</InputLabel>
        <OutlinedInput label="direction" name="direction" type="string" value={address} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAddress(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Contraseña</InputLabel>
        <OutlinedInput label="Password" name="password" type="password" value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Confirmar Contraseña</InputLabel>
        <OutlinedInput label="Confirm password" name="confirmPassword" type="password" value={confirmPassword} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(event.target.value);
        }}/>
      </FormControl>
    </>
  );
}
