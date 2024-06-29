'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {FormInputs} from "@/components/forms/Users/FormInputs";
import {useEffect} from "react";
import {editUser, postUser} from "@/services/UserServices";

export function EditUser(props): React.JSX.Element {

  const [dataToSend, setDataToSend] = React.useState({});
  const [enableSave, setEnableSave] = React.useState(false);

  const saveUser = () => {
    editUser(dataToSend, props.data.id).then((data) => {
      props.setOpen(false)
      window.location.reload();
    });
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
      <FormInputs data={props?.data}
                  setDataToSend={setDataToSend}
                  setEnableSave={setEnableSave}
      />

      <Divider />

      <Button variant="contained" onClick={() => {
        saveUser();
      }}>Editar</Button>
    </Stack>
  );
}
