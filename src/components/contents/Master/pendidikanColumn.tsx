import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { PendidikanType } from './Pendidikan';

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
