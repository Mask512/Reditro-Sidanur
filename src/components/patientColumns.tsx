import { ColumnDef } from '@tanstack/react-table';
import { PatientType } from './contents/Register';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const patientColumns = (
  action: (id: string) => string,
): ColumnDef<PatientType>[] => [
  {
    accessorKey: 'nomorPasien',
    header: 'No. RM',
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
      return row.original.golonganDarah?.id;
    },
  },
  {
    accessorKey: 'hubunganPenanggungJawab',
    header: 'Hubungan',
    cell: ({ row }) => {
      return row.original.hubunganPenanggungJawab?.id;
    },
  },
  {
    accessorKey: 'namaPenanggungJawab',
    header: 'Penanggung Jawab',
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const {id} = row.original ;
      return (
        <Button>
          <Link to={action(id)}>Periksa</Link>
        </Button>
      );
    },
  },
];
