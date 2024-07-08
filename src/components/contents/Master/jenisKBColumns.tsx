import { ColumnDef } from '@tanstack/react-table';
import { JenisKBType } from './JenisKB';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const jenisKBColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<JenisKBType>[] => [
  {
    accessorKey: 'nama',
    header: 'Jenis KB',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Jenis KB ?',
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
