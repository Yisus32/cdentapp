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



  const [dniError, setDniError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);


useEffect(() => {
    validateFields(); // Validar campos iniciales

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

  const validateFields = () => {
    const dniRegex = /^[0-9]+$/; // Expresión regular para validar números
    const phoneRegex = /^[0-9]+$/;
  
    const isDniValid = dniRegex.test(dni);
    const isPhoneValid = phoneRegex.test(phone);
  
    setDniError(!isDniValid);
    setPhoneError(!isPhoneValid);
  
    return isDniValid && isPhoneValid; // Retorna true si todos los campos son válidos


    const handleConfirmPassword = (event:React.ChangeEvent<HTMLInputElement>) =>{ 
      setConfirmPassword(event.target.value <= 12 ? event.target.value : password);
    };

    const isPasswordValid = password === confirmPassword && password.length > 0;

  };
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
          <OutlinedInput label="dni" name="dni" type="number" inputMode="numeric" value={dni}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length <= 10) {  // Check the character count before updating the state
                setDni(event.target.value);
                setDniError(false); // Reset the error when the value changes
              }
            }}
            error={dniError} // Apply error styling if there's a validation error
            inputProps={{
              maxLength: 10, // Set the maximum character limit to 10
            }}
          />
      </FormControl>


      <FormControl fullWidth>
        <InputLabel>Rol</InputLabel>
        <Select value={role} onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
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
        <OutlinedInput label="phone" name="phone" type="number" inputMode="numeric" value={phone}            
         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length <= 12) {              
                setPhone(event.target.value);
                setPhoneError(false);
              }
            }}
            error={phoneError}
            inputProps={{
              maxLength: 12,
            }}
          />
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
          setPassword(event.target.value.length <= 12 ? event.target.value : password);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Confirmar Contraseña</InputLabel>
        <OutlinedInput 
        label="Confirm password" 
        name="confirmPassword" 
        type="password" 

        value={confirmPassword} 
        onChange={(handleConfirmPassword)  
        error = {!isPasswordValid}
        }/>
      </FormControl>
    </>
  );
}