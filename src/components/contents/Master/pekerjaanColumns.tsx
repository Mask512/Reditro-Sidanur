import { ColumnDef } from '@tanstack/react-table';
import { PekerjaanType } from './Pekerjaan';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const pekerjaanColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<PekerjaanType>[] => [
  {
    accessorKey: 'nama',
    header: 'Pekerjaan',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Jenis Pekerjaan ?',
            description: `${row.original.nama} akan dihapus secara permanen .`,
          }}
          buttonVariant="destructive"
          action={() => handleDelete(row.original.id)}
          actionName="Hapus"
          icon={<Trash className="mr-2 h-4 w-4" />}
        />
      );
    },
  },
];
