import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ChangeEvent, useState } from 'react';
import { LokasiPraktekType } from '@/schema/schema';

type DataPraktekFormProps = {
  data: LokasiPraktekType;
  handleEdit: (id: string, newData: LokasiPraktekType) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
const DataPraktekForm: React.FC<DataPraktekFormProps> = ({
  data,
  handleEdit,
}) => {
  const [newData, setNewData] = useState<LokasiPraktekType>({
    id: data.id,
    nama: data.nama,
    alamat: data.alamat,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    handleEdit(data.id, newData);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Data Lokasi Praktek</DialogTitle>
        <DialogDescription>
          Masukan data yang digunakan untuk mengubah data lokasi praktek.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nama" className="text-right">
            Nama
          </Label>
          <Input
            name="nama"
            value={newData.nama}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="alamat" className="text-right">
            Alamat
          </Label>
          <Input
            name="alamat"
            value={newData.alamat}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSaveChanges}>Simpan perubahan</Button>
      </DialogFooter>
    </>
  );
};

export const dataPraktekColumns = (
  handleEdit: (id: string, newData: LokasiPraktekType) => void,
): ColumnDef<LokasiPraktekType>[] => [
  {
    accessorKey: 'nama',
    header: 'Nama Lokasi Praktek',
  },
  {
    accessorKey: 'alamat',
    header: 'Alamat',
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DataPraktekForm data={row.original} handleEdit={handleEdit} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
