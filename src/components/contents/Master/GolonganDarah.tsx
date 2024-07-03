import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { golonganDarahColumns } from './golonganDarahColumns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type BloodTypes = {
  id: string;
  nama: string;
};

export const GolonganDarah = () => {
  const [dataDarah, setDataDarah] = useState<BloodTypes[]>([]);
  const [golonganDarah, setGolonganDarah] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/golongan-darahs`);
    if (data) {
      setDataDarah(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataDarah]);

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/golongan-darahs/${id}`);
    fetchData();
  };

  const handleUpdate = async () => {
    if (golonganDarah.trim()) {
      await axios.post(`${APP.API_URL}/golongan-darahs`, {
        nama: golonganDarah,
      });
      setGolonganDarah('');
      fetchData();
    }
  };

  return (
    <>
      <BreadCrumb pageName="Golongan Darah" />
      <h1 className="text-xl font-semibold">Golongan Darah</h1>
      
      <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Jenis Golongan Darah"
            value={golonganDarah}
            onChange={(e) => setGolonganDarah(e.target.value)}
          />
          <Button onClick={handleUpdate}>Tambahkan</Button>
        </div>

        <DataTable
          columns={golonganDarahColumns(handleDelete)}
          data={dataDarah}
        />
      </div>
    </>
  );
};
