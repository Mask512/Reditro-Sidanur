import { ColumnDef } from '@tanstack/react-table';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';
import { GolonganDarahType } from '@/schema/schema';

export const golonganDarahColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<GolonganDarahType>[] => [
  {
    accessorKey: 'nama',
    header: 'Golongan Darah',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Golongan Darah ?',
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
