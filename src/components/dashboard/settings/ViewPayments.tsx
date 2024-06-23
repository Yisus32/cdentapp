import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ShowPaymentsData from "@/components/dashboard/settings/ShowPaymentsData";





export default function ViewPayments(props) {
  const { data } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{ bgcolor: '#fff', height: '30vh', width: '100%'}}
        component="form"
        noValidate
        autoComplete="off"
      >
        <ShowPaymentsData data={data} />

      </Container>
    </React.Fragment>
  );
}
