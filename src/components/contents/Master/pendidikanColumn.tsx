import { ColumnDef } from '@tanstack/react-table';
import { PendidikanType } from './Pendidikan';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const pendidikanColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<PendidikanType>[] => [
  {
    accessorKey: 'nama',
    header: 'Pendidikan',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Jenis Pendidikan ?',
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
