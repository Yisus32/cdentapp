import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const ClinicHistoryForm = (props) => {
  const {
    handleAgeChange,
    handleChildNumberChange,
    handleHeightChange,
    handleBloodTypeChange,
    handleDiseaseChange,
    handleDescriptionDiseaseChange,
    handleWeightChange,
    disease,
    handMedicinesChange,
    handleDescriptionMedicinesChange,
    medicines,
    handSurgeryChange,
    handleDescriptionSurgeryChange,
    handAllergiesChange,
    handleDescriptionAllergiesChange,
    allergies,
    saveMedicalHistory,
    sugery

  } = props

  return (
    <>
      <h1>Historial Medico</h1>

      <h3>Informacion General</h3>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
        <Grid item xs={6} md={6}>
          <OutlinedInput
            id="age"
            label="Edad"
            type="number"
            onChange={(event) => {
              handleAgeChange(event.target.value)
            }}
          />
        </Grid>

        <Grid item xs={6} md={6}>
          <OutlinedInput
            id="child_number"
            label="Nro. de Hijos"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChildNumberChange(event.target.value)
            }}
          />
        </Grid>

        <Grid item xs={6} md={6}>
          <OutlinedInput
            id="weight"
            label="Peso"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleWeightChange(event.target.value)
            }}
          />

        </Grid>

        <Grid item xs={6} md={6}>
          <OutlinedInput
            id="height"
            label="Altura"
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleHeightChange(event.target.value)
            }}

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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleBloodTypeChange(event.target.value)
            }}

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
            disease ? (<TextField id="standard-basic" label="Describa cual" variant="standard" onChange={handleDescriptionDiseaseChange} />) : null
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
            medicines ? (<TextField id="standard-basic" label="Describa cual" variant="standard" onChange={handleDescriptionMedicinesChange} />) : null
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
            sugery ? (<TextField id="standard-basic" label="Describa cual" variant="standard" onChange={handleDescriptionSurgeryChange}/>) : null
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
            allergies ? (<TextField id="standard-basic" label="Describa cual" variant="standard" onChange={handleDescriptionAllergiesChange} />) : null
          }
        </Grid>
      </Grid>

      <Stack spacing={5} sx={{ maxWidth: 'sm' }}>

        <Divider />

        <Button variant="contained"
                onClick={() => {
                  saveMedicalHistory();
                }}
        >Guardar</Button>
      </Stack>
    </>
  )
}
export default ClinicHistoryForm
