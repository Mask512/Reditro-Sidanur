import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PekerjaanType } from './Pekerjaan';


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
