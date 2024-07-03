import { ColumnDef } from '@tanstack/react-table';
import { BloodTypes } from './GolonganDarah';
import { Button } from '@/components/ui/button';

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
