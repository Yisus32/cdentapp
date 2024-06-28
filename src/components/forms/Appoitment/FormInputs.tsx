'use client';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";
import { getUsersByMedicalRol } from '@/services/AppointmentServices';
import {getUsersByPatientRol} from '@/services/AppointmentServices'

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
  const [medicList, setMedicList] = React.useState([]);
  const [patientList, setPatientList] = React.useState([]);

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

  useEffect(() => {
    getUsersByMedicalRol(3).then(response => {
      console.log(response)
      setMedicList(response)
    })
  }, [])

  console.log(medicList)


  useEffect(() => {
    getUsersByPatientRol(2).then(response => {
      setPatientList(response)
    })
  }, [])

  console.log(patientList)

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
        <Select defaultValue="patient" label="patient" name="patient" variant="outlined" value={patientList} onChange={
          (event: React.ChangeEvent<{ value: unknown }>) => {
            setPatientList(event.target.value);
          }
        }>
          {patientList.map((patient) => (
            <MenuItem key={patient.id} value={patient.id}>
              {patient.name} {patient.lastname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <FormControl fullWidth>
        <InputLabel>Medico</InputLabel>
        <Select defaultValue="medical" label="medical" name="medical" variant="outlined" value={medicList} onChange={
          (event: React.ChangeEvent<{ value: unknown }>) => {
            setMedicList(event.target.value);
          }
        }>
          {medicList.map((medic) => (
            <MenuItem key={medic.id} value={medic.id}>
              {medic.name} {medic.lastname}
            </MenuItem>
          ))}
        </Select>
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
