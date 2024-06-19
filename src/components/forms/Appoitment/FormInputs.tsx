'use client';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Fecha</InputLabel>
        <OutlinedInput label="date" name="date" type="date" value={date} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDate(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Paciente</InputLabel>
        <OutlinedInput label="patient" name="patient" type="text" value={patient} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPatient(event.target.value);
        }}/>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Medico</InputLabel>
        <OutlinedInput label="doctor" name="doctor" type="text" value={medicalProfessional} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMedicalProfessional(event.target.value);
        }} />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select defaultValue="Consulta" label="State" name="state" variant="outlined" value={state} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setState(event.target.value);
        }}>
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
