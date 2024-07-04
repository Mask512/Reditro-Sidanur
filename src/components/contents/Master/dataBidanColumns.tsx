import { ColumnDef } from '@tanstack/react-table';
import { DataBidanType } from './DataBidan';
import { Button } from '@/components/ui/button';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';

export const dataBidanColumns = (
  deleteBidan: (id: string) => void,
): ColumnDef<DataBidanType>[] => [
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'alamat',
    header: 'Alamat',
  },
  {
    accessorKey: 'noHp',
    header: 'Nomor Telepon',
  },
  {
    accessorKey: 'noSTR',
    header: 'Nomor STR',
  },
  {
    accessorKey: 'tempatLahir',
    header: 'Tempat Lahir',
  },
  {
    accessorKey: 'tanggalLahir',
    header: 'Tanggal Lahir',
  },
  {
    id: 'action',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => console.log(row.original.id)}
            disabled
          >
            Edit
          </Button>
          <ConfirmAlert
            messages={{
              title: 'Hapus Data Bidan ?',
              description: `${row.original.nama} akan dihapus secara permanen .`,
            }}
            buttonVariant="destructive"
            action={() => deleteBidan(row.original.id)}
            actionName='Hapus'
            icon={<Trash className='mr-2 h-4 w-4'/>}
          />
        </div>
      );
    },
  },
];
