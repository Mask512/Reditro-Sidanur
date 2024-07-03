import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { HubunganType } from './Hubungan';

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
