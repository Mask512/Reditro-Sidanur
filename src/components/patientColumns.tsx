import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { PatientType } from '@/schema/schema';
import { ArrowUpDown } from 'lucide-react';

export const patientColumns = (
  action: (id: string) => string,
): ColumnDef<PatientType>[] => [
  {
    accessorKey: 'nomorPasien',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nomor RM <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: 'tempatLahir',
    header: 'Tempat Lahir',
  },
  {
    accessorKey: 'tanggalLahir',
    header: 'Tanggal Lahir',
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
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Button>
          <Link to={action(id)}>Periksa</Link>
        </Button>
      );
    },
  },
];
