import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { pendidikanColumns } from './pendidikanColumn';

export type PendidikanType = {
  id: string;
  nama: string;
};

const endpoint = 'pendidikans';

export const Pendidikan = () => {
  const [dataPendidikan, setDataPendidikan] = useState<PendidikanType[]>([]);
  const [pendidikan, setPendidikan] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
      setDataPendidikan(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataPendidikan])

  const handleAdd = async ()=> {
    if (pendidikan.trim()) {
      await axios.post(`${APP.API_URL}/${endpoint}`, {
        nama: pendidikan,
      });
      setPendidikan('');
      fetchData();
    }
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/${endpoint}/${id}`);
    fetchData();
  };


  return (
    <>
      <BreadCrumb pageName="Pendidikan" />
      <h1 className="text-xl font-semibold">Pendidikan</h1>
      <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Pendidikan"
            value={pendidikan}
            onChange={(e) => setPendidikan(e.target.value)}
          />
          <Button onClick={handleAdd}>Tambahkan</Button>
        </div>

        <DataTable
          columns={pendidikanColumns(handleDelete)}
          data={dataPendidikan}
        />
      </div>
    </>
  );
};
