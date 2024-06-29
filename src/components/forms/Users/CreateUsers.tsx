'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Users/FormInputs";
import {deleteCustomer, postUser} from "@/services/UserServices";

export function CreateUser(props): React.JSX.Element {
  const [dataToSend, setDataToSend] = React.useState({});
  const [enableSave, setEnableSave] = React.useState(false);

  const saveUser = () => {
    postUser(dataToSend).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  const daleteUser = () => {
    deleteUser(dataToSend)
    props
  }

  return (
      <Stack spacing={3} sx={{maxWidth: 'sm' }}>
        <FormInputs setDataToSend={setDataToSend} setEnableSave={setEnableSave}/>

        <Divider />

        <Button variant="contained"
                onClick={() => {
                  saveUser();
                }}
                disabled={! enableSave}
        >Agregar</Button>
      </Stack>
  );
}
