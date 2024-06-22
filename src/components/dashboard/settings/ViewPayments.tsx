import * as React from 'react';
import styled from '@mui/material/styles/styled';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {width} from "@mui/system";


const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewPayments(props) {
  const { data } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <Box sx={{ bgcolor: '#fff', height: '30vh' }} component="form" noValidate autoComplete="off">
          <Grid container spacing={3} rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item sm={12} md={12}>
              <Item> Tipo de Transaccion : {data.type === 'transaction ' ? 'Transaferencia Bancaria' : 'Efectivo'}</Item>
            </Grid>
            <Grid item sm={12} md={12}>
              <Item>Monto: {data.amount}</Item>
            </Grid>
            <Grid item sm={12} md={12}>
              <Item>Codigo o Referencia: {data.refCode}</Item>
            </Grid>
            <Grid item sm={12} md={12}>
              <Item>Fecha de pago: {data.createdAt}</Item>
            </Grid>
          </Grid>

          <Stack spacing={2}  direction="row" margin={1}>
            <Button variant="contained"> Enviar Comprobante al Paciente </Button>
            <Button variant="contained"> Enviar Comprobante al Medico </Button>
            <Button variant="contained" color="error"> Cancelar </Button>
          </Stack>
        </Box>

      </Container>
    </React.Fragment>
  );
}
