import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { JenisKBType } from './JenisKB';

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
        <Button
          variant="destructive"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>
      );
    },
  },
];
