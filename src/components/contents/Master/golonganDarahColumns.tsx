import { ColumnDef } from '@tanstack/react-table';
import { BloodTypes } from './GolonganDarah';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const golonganDarahColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<BloodTypes>[] => [
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
