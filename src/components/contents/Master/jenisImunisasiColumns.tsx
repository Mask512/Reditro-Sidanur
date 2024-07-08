import { ColumnDef } from '@tanstack/react-table';
import { JenisImunisasiType } from './JenisImunisasi';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const jenisImunisasiColumns = (
  handleDelete: (id: string) => void,
): ColumnDef<JenisImunisasiType>[] => [
  {
    accessorKey: 'nama',
    header: 'Jenis Imunisasi',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <ConfirmAlert
          messages={{
            title: 'Hapus Jenis Imunisasi ?',
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
