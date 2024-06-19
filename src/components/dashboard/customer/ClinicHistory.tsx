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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';

import Radio from '@mui/material/Radio';
import {width} from "@mui/system";


const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function ClinicHistory() {

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#fff', height: '80vh'}} component="form" noValidate autoComplete="off">

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
              <InputLabel id="bloodtype">Grupo Sanguineo</InputLabel>
              <Select
                labelId="bloodtype"
                id="bloodtype"
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                style={{width: 200}}

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
              <InputLabel id="disease">Posee una Enfermedad</InputLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group">
                <FormControlLabel value="si" control={<Radio />} label="SI" />
                <FormControlLabel value="no" control={<Radio />} label="NO" />

              </RadioGroup>
            </Grid>

            <Grid item xs={6} md={6}  >
              <TextField id="standard-basic" label="Describa cual" variant="standard" />
            </Grid>

          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
