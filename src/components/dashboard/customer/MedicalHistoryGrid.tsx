import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { Theme } from "@mui/material";
import { getMedicalHistoryByUserId } from "@/services/UserServices";

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MedicalHistoryGrid = (props) => {
  return (
    <Box
      sx={{ bgcolor: '#fff', height: '30vh'}}
      component="form"
      noValidate
      autoComplete="off"
      borderRadius={2}
    >
      <Grid container
            spacing={3}
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      >
          <Grid item xs={12}>
            <Stack direction={{xs: 'column', sm:'column'}}
                   spacing={{ xs: 1, sm: 1, md: 1 }}
                   margin={1}
            >
                <Item> Edad : {props.dataToSend?.age}</Item>
                <Item>Numero de Hijos : {props.dataToSend?.child_number}</Item>
                <Item> Peso : {props.dataToSend?.weight}</Item>
                <Item> Altura : {props.dataToSend?.height}</Item>
                <Item> Enfermedad : {props.dataToSend?.disease}</Item>
                <Item> Tipo de Enfermeda : {props.dataToSend?.description_disease === "" ? 'Ninguna' : props.dataToSend?.description_disease}  </Item>
                <Item> Medicamentos : {props.dataToSend?.medicines}</Item>
                <Item> Tipo de Medicamentos : {props.dataToSend?.description_medicines === "" ? 'Nimguna': props.dataToSend?.description_medicines }</Item>
                <Item> Cirugia : {props.dataToSend?.sugery}</Item>
                <Item> Tipo de Cirugia : {props.dataToSend.description_sugery === "" ? 'Ninguna' : props.dataToSend.description_sugery} </Item>
                <Item> Alergias : {props.dataToSend?.allergies}</Item>
                <Item> Tipo de Alergias : {props.dataToSend?.description_allergies === "" ? 'Ninguna': props.dataToSend?.description_allergies }</Item>


            </Stack>
          </Grid>
      </Grid>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        margin={3}
        justifyContent='center'
      >
        <Button   variant='contained' color= 'secondary'> Exportar </Button>
        <Button   variant= 'contained' color= 'error'> Eliminar </Button>
      </Stack>
    </Box>
  );
}

export default MedicalHistoryGrid;
