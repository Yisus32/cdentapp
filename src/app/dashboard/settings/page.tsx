'use client'

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Button from "@mui/material/Button";
import {Upload as UploadIcon} from "@phosphor-icons/react/dist/ssr/Upload";
import {Download as DownloadIcon} from "@phosphor-icons/react/dist/ssr/Download";
import {Plus as PlusIcon} from "@phosphor-icons/react/dist/ssr/Plus";
import {PaymentsTable} from "@/components/dashboard/settings/payments-table";
import dayjs from "dayjs";
import type {Payment} from "@/components/dashboard/settings/payments-table";
import FormModal from "@/components/forms/Utils/FormModal";
import {PaymentsForm} from "@/components/forms/Payments/CreatePayments";

const payments = [
  {
    id: 'USR-010',
    refCode: '0123847262',
    type: 'Transf. Bancaria',
    amount: '$20.00 USD',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-010',
    refCode: '0128926345',
    type: 'Efectivo',
    amount: '$20.00 USD',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-010',
    refCode: '0123847262',
    type: 'Transf. Bancaria',
    amount: '$15.00 USD',
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Payment[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedPayments = applyPagination(payments, page, rowsPerPage);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

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

      <FormModal form={<PaymentsForm/>}
                 open={open}
                 handleClose={handleClose}
      />
    </Stack>
  );
}

function applyPagination(rows: Payment[], page: number, rowsPerPage: number): Payment[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

