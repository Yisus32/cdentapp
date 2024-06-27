'use client';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";

const states = [
  { value: 'Consulta', label: 'Consulta' },
  { value: 'Cirugia', label: 'Cirugia' },
  { value: 'Ortodoncia', label: 'Ortodoncia' },
  { value: 'Paronamica', label: 'Paronamica' },
] as const;

export function FormInputs(props): React.JSX.Element {
  const { data } = props;

  const [date, setDate] = React.useState(data?.date);
  const [patient, setPatient] = React.useState(data?.patient);
  const [medicalProfessional, setMedicalProfessional] = React.useState(data?.medicalProfessional);
  const [state, setState] = React.useState(data?.state);
  const [status, setStatus] = React.useState(data?.status);
  const [user, setUser] = React.useState(data?.user);

  const formatAndSetDate = (date) => {
    const summonDate = new Date(date)
    const formattedDate = summonDate.toISOString().split('T')[0];

    setDate(formattedDate);
  }


  useEffect(() => {
    const data = {
      user_id: user,
      date: date,
      patient_id: patient,
      doctor_id: medicalProfessional,
      state: state,
      status: status,
    }

    props?.setDataToSend(data);

    }, [user, date,medicalProfessional, patient ,state, status]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Usuario</InputLabel>
        <OutlinedInput label="user" name="user" type="number" value={user} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUser(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Fecha</InputLabel>
        <OutlinedInput label="date" name="date" type="date" value={date} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          formatAndSetDate(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Paciente</InputLabel>
        <OutlinedInput label="patient" name="patient" type="number" value={patient} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPatient(event.target.value);
        }}/>
      </FormControl>


      <FormControl fullWidth>
        <InputLabel>Medico</InputLabel>
        <OutlinedInput label="doctor" name="doctor" type="number" value={medicalProfessional} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMedicalProfessional(event.target.value);
        }} />
      </FormControl>


      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select defaultValue="Consulta" label="State" name="state" variant="outlined" value={state} onChange={
          (event: React.ChangeEvent<{ value: unknown }>) => {
            setState(event.target.value);
          }
        }>
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <OutlinedInput label="Status" name="status" type="text" value={status} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setStatus(event.target.value);
        }} />
      </FormControl>


    </>
  );
}
