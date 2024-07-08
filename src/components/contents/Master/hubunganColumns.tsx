import { ColumnDef } from '@tanstack/react-table';
import { HubunganType } from './Hubungan';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const hubunganColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<HubunganType>[] => [
  {
    accessorKey: 'nama',
    header: 'Hubungan Penanggung Jawab',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Hubungan Penanggung Jawab ?',
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
