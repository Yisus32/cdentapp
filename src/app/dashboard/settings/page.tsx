'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Button from "@mui/material/Button";
import {Upload as UploadIcon} from "@phosphor-icons/react/dist/ssr/Upload";
import {Download as DownloadIcon} from "@phosphor-icons/react/dist/ssr/Download";
import {Plus as PlusIcon} from "@phosphor-icons/react/dist/ssr/Plus";
import {PaymentsTable} from "@/components/dashboard/settings/payments-table";
import type {Payment} from "@/components/dashboard/settings/payments-table";
import FormModal from "@/components/forms/Utils/FormModal";
import {PaymentsForm} from "@/components/forms/Payments/CreatePayments";
import {useEffect} from "react";
import getPayments from "@/services/PaymentServices";


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;


  const [open, setOpen] = React.useState(false);

  const [payments, setPayments] = React.useState<Payment[]>([]);

  const handleOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  useEffect(() => {
    getPayments().then((data) => {
      setPayments(data['payments']);
    });
  }, []);

  console.log(payments);
  const paginatedPayments = applyPagination(payments, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Pagos</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleOpen}>
            Add
          </Button>
        </div>
      </Stack>

      <PaymentsTable
        count={paginatedPayments.length}
        page={page}
        rows={paginatedPayments}
        rowsPerPage={rowsPerPage}
      />

      <FormModal form={<PaymentsForm setOpen={setOpen}/>}
                 open={open}
                 handleClose={handleClose}
      />
    </Stack>
  );
}

function applyPagination(rows: Payment[], page: number, rowsPerPage: number): Payment[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

