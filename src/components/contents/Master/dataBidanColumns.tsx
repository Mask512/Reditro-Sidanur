import { ColumnDef } from '@tanstack/react-table';
import { BidanType } from '@/schema/schema';

interface dataBidanColumnsProps {
  handleAction: (id: string) => React.ReactNode;
}
export const dataBidanColumns = ({
  handleAction,
}: dataBidanColumnsProps): ColumnDef<BidanType>[] => [
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'alamat',
    header: 'Alamat',
  },
  {
    accessorKey: 'noHp',
    header: 'Nomor Telepon',
  },
  {
    accessorKey: 'noSTR',
    header: 'Nomor STR',
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
    accessorKey: 'user',
    header: 'Account',
    cell: ({ row }) =>
      row.original.user ? row.original.user.login : 'Not Linked',
  },
  {
    id: 'action',
    cell: ({ row }) => handleAction(row.original.id as string),
  },
];
