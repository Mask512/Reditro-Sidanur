import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import { PatientType } from '@/schema/schema';
import { ArrowUpDown } from 'lucide-react';
import { formatDateID } from '@/utils/formatter';
import React from 'react';

interface PatientColumnsProps {
  action: (id: string) => React.ReactNode;
}

export const patientColumns = ({
  action,
}: PatientColumnsProps): ColumnDef<PatientType>[] => [
  {
    accessorKey: 'nomorPasien',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NOMOR RM <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'nik',
    header: 'NIK KTP',
  },
  {
    accessorKey: 'alamat',
    header: 'Alamat',
  },
  {
    accessorKey: 'tempatLahir',
    header: 'Tempat Lahir',
  },
  {
    accessorKey: 'tanggalLahir',
    header: 'Tanggal Lahir',
    cell: (info) => formatDateID(info.getValue() as string),
  },
  {
    accessorKey: 'noTelp',
    header: 'No. Telp',
  },
  {
    accessorKey: 'golonganDarah',
    header: 'Gol. Darah',
    cell: ({ row }) => {
      return row.original.golonganDarah?.nama;
    },
  },
  {
    accessorKey: 'namaPenanggungJawab',
    header: 'Penanggung Jawab',
  },
  {
    accessorKey: 'hubunganPenanggungJawab',
    header: 'Hubungan',
    cell: ({ row }) => {
      return row.original.hubunganPenanggungJawab?.nama;
    },
  },

  {
    id: 'action',
    cell: ({ row }) => action(row.original.id || ''),
  },
];
