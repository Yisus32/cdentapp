'use client';

import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";
import FormHelperText from "@mui/material/FormHelperText";



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
  const [namesError, setNamesError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const validateFormFields = () => {
    const regexDni = /^\d{7,8}$/;
    const regexPhone = /^\d{11,12}$/;
    const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s]+$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const regexAddress = /^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ\s\d]+$/;

    if (! regexDni.test(dni)) {
      setDniError(true);
      return false;
    }

    if (! regexPhone.test(phone)) {
      setPhoneError(true);
      return false;
    }

    if (! regexNames.test(name) || ! regexNames.test(lastname)) {
      setNamesError(true);
      return false;
    }

    if(! regexEmail.test(email)) {
      setEmailError(true);
      return false;
    }

    if (! regexAddress.test(address)) {
      setAddressError(true);
      return false;
    }

    if (! regexPassword.test(password)) {
      setPasswordError(true);
      return false;
    }

    setDniError(false);
    setPhoneError(false);
    setNamesError(false);
    setEmailError(false);
    setAddressError(false);
    setPasswordError(false);

    return true;
  }

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

      if (validateFormFields()) {
        props?.setEnableSave(true);
      }else{
        props?.setEnableSave(false);
      }

      props?.setDataToSend(data);
    }, [name, lastname, dni, phone, email, address, role, password]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Nombre</InputLabel>
        <OutlinedInput label="name"
                       name="name"
                       type="text"
                       value={name}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                       }}
                       error={namesError}
                       required={true}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Apellido</InputLabel>
        <OutlinedInput label="lastname"
                       name="lastname"
                       type="text"
                       value={lastname}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setLastname(event.target.value);
                       }}
                       error={namesError}
                       required={true}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Cedula</InputLabel>
          <OutlinedInput label="dni"
                         name="dni"
                         type="text"
                         value={dni}
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDni(event.target.value);
                         }}
                         required={true}
          />
      </FormControl>


      <FormControl fullWidth>
        <InputLabel>Rol</InputLabel>
        <Select
          value={role}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
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
        <OutlinedInput label="phone"
                       name="phone"
                       type="number"
                       inputMode="numeric"
                       value={phone}
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
        <OutlinedInput label="email"
                       name="email"
                       type="email"
                       value={email}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value)
                       }}
                       error={emailError}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Direccion</InputLabel>
        <OutlinedInput label="direction"
                       name="direction"
                       type="string"
                       value={address} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setAddress(event.target.value);
                       }}
                       error={addressError}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Contraseña</InputLabel>
        <OutlinedInput label="Password"
                       name="password"
                       type="password"
                       value={password}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setPassword(event.target.value.length <= 12 ? event.target.value : password);
                       }}
                       error={passwordError}
        />
        <FormHelperText>Debe contener 8 caracteres entre letras y números</FormHelperText>
      </FormControl>
    </>
  );
}
