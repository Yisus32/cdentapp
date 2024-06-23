import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import {Theme} from "@mui/material/styles";
import QRCode from "react-qr-code";

const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ShowPaymentsData = (props) => {
  const {data} = props;

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
         <Grid item xs={6}>
           <Stack direction={{xs: 'column', sm:'column'}}
                  spacing={{ xs: 1, sm: 1, md: 1 }}
                  margin={1}
           >
             <Item>Tipo de Pago: {data.type === 'transaction' ? 'Transf. Bancaria' : 'Efectivo'}</Item>
             <Item>Codigo: {data.refCode}</Item>
             <Item>Monto: {data.amount}</Item>
             <Item>Fecha del Pago: {data.createdAt}</Item>
           </Stack>
         </Grid>


         <Grid item xs={6} >
           <QRCode
             size={256}
             style={{ height: "auto", maxWidth: "90%", width: "90%" }}
             value={'Hello World'}
             viewBox={`0 0 256 256`}
           />
         </Grid>

       </Grid>

       <Stack
         direction={{ xs: 'column', sm: 'row' }}
         spacing={{ xs: 1, sm: 2, md: 4 }}
         margin={3}
         justifyContent='center'
       >
         <Button   variant='contained' color= 'secondary'> Exportar </Button>
         <Button  variant='contained' color = 'success'> Notificar </Button>
         <Button   variant= 'contained' color= 'error'> Cancelar </Button>
       </Stack>
      </Box>
    )
};

export default ShowPaymentsData;
