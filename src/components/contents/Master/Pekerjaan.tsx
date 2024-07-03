import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { pekerjaanColumns } from './pekerjaanColumns';

export type PekerjaanType = {
  id: string;
  nama: string;
};
const endpoint = 'pekerjaans';

export const Pekerjaan = () => {
  const [dataPekerjaan, setDataPekerjaan] = useState<PekerjaanType[]>([]);
  const [pekerjaan, setPekerjaan] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
      setDataPekerjaan(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataPekerjaan]);

  const handleAdd = async ()=> {
    if (pekerjaan.trim()) {
      await axios.post(`${APP.API_URL}/${endpoint}`, {
        nama: pekerjaan,
      });
      setPekerjaan('');
      fetchData();
    }
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/${endpoint}/${id}`);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName="Pekerjaan" />
      <h1 className="text-xl font-semibold">Pekerjaan</h1>
      <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Pekerjaan"
            value={pekerjaan}
            onChange={(e) => setPekerjaan(e.target.value)}
          />
          <Button onClick={handleAdd}>Tambahkan</Button>
        </div>

        <DataTable
          columns={pekerjaanColumns(handleDelete)}
          data={dataPekerjaan}
        />
      </div>
    </>
  );
};
