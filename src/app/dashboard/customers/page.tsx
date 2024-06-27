'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import {CreateUser} from "@/components/forms/Users/CreateUsers";
import FormModal from "@/components/forms/Utils/FormModal";
import {getUsers} from "@/services/UserServices";
import {useEffect} from "react";


export default function Page(): React.JSX.Element {
  const page = 0;

  const rowsPerPage = 5;

  const [open, setOpen] = React.useState(false);

  const [users, setUsers] = React.useState<Customer[]>([]);

  const handleOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data['users']);
    });
  }, []);



  const paginatedCustomers = applyPagination(users, page, rowsPerPage);


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{flex: '1 1 auto'}}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)"/>}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)"/>}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon
            fontSize="var(--icon-fontSize-md)"/>}
                  variant="contained"
                  onClick={handleOpen}
          >
            Add
          </Button>
        </div>
      </Stack>

      <CustomersFilters/>

      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />


        <FormModal form={<CreateUser setOpen={setOpen}/>}
                   open={open}
                   handleClose={handleClose}
        />

    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
