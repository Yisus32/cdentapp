import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';

import Radio from '@mui/material/Radio';
import {width} from "@mui/system";
import {FormInputs} from "@/components/forms/Appoitment/FormInputs";
import Divider from "@mui/material/Divider";


const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function ClinicHistory() {

  const [disease, setDisease] = React.useState(false);
  const [medicines, setMedicines] = React.useState(false);
  const [sugery, setSugery] = React.useState(false);
  const [allergies, setAllergies] = React.useState(false);

  const handleDiseaseChange = (event) => {
    setDisease(event.target.value === 'si' ? true : false)
  }

  const handMedicinesChange = (event) => {
    setMedicines(event.target.value === 'si' ? true : false)
  }

const handSurgeryChange = (event) => {
    setSugery(event.target.value === 'si' ? true : false)
}

const handAllergiesChange = (event) => {
    setAllergies(event.target.value === 'si' ? true : false)
}

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#fff', height: '75vh'}} component="form" noValidate autoComplete="off">

          <h1>Historial Medico</h1>

          <h3>Informacion General</h3>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
            <Grid item xs={6} md={6}>
              <TextField
                id="age"
                label="Edad"
                type="number"
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                id="child_number"
                label="Nro. de Hijos"
                type="number"
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                id="weight"
                label="Peso"
                type="number"
              />

            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                id="height"
                label="Altura"
                type="number"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <InputLabel id="bloodtype">Grupo Sanguineo</InputLabel>
              <Select
                labelId="bloodtype"
                id="bloodtype"
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{width: 500}}

              >
                <MenuItem value={'O'}>O+</MenuItem>
                <MenuItem value={'O-'}>O-</MenuItem>
                <MenuItem value={'A+'}>A+</MenuItem>
                <MenuItem value={'A-'}>A-</MenuItem>
                <MenuItem value={'B+'}>B+</MenuItem>
                <MenuItem value={'B-'}>B-</MenuItem>
                <MenuItem value={'AB+'}>AB+</MenuItem>
                <MenuItem value={'AB-'}>AB-</MenuItem>
              </Select>
            </Grid>


            <Grid item xs={6} md={6} >
              <InputLabel id="disease">Posee una Enfermedad?</InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleDiseaseChange}
              >
                  <FormControlLabel value="si" control={<Radio />} label="SI" />
                  <FormControlLabel value="no" control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>

            <Grid item xs={6} md={6}>
              {
                disease ? (<TextField id="standard-basic" label="Describa cual" variant="standard" />) : null
              }
            </Grid>

            <Grid item xs={6} md={6} >
              <InputLabel id="disease">Toma medicamentos?</InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handMedicinesChange}
              >
                <FormControlLabel value="si" control={<Radio />} label="SI" />
                <FormControlLabel value="no" control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>

            <Grid item xs={6} md={6}>
              {
                medicines ? (<TextField id="standard-basic" label="Describa cual" variant="standard" />) : null
              }
            </Grid>

            <Grid item xs={6} md={6} >
              <InputLabel id="disease">Ha tenido cirugias?</InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handSurgeryChange}
              >
                <FormControlLabel value="si" control={<Radio />} label="SI" />
                <FormControlLabel value="no" control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>

            <Grid item xs={6} md={6}>
              {
                sugery ? (<TextField id="standard-basic" label="Describa cual" variant="standard" />) : null
              }
            </Grid>

            <Grid item xs={6} md={6} >
              <InputLabel id="disease">Alergias?</InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handAllergiesChange}
              >
                <FormControlLabel value="si" control={<Radio />} label="SI" />
                <FormControlLabel value="no" control={<Radio />} label="NO" />
              </RadioGroup>
            </Grid>

            <Grid item xs={6} md={6}>
              {
                allergies ? (<TextField id="standard-basic" label="Describa cual" variant="standard" />) : null
              }
            </Grid>
          </Grid>

          <Stack spacing={5} sx={{ maxWidth: 'sm' }}>

            <Divider />

            <Button variant="contained">Guardar</Button>
          </Stack>

        </Box>
      </Container>
    </React.Fragment>
  );
}
