import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ShowAppointmentData from "@/components/dashboard/integrations/ShowAppointmentData";

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];


export default function ViewAppoitments(props) {
  const { data } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container >
        <ShowAppointmentData data={data} />
      </Container>
    </React.Fragment>
);
}
