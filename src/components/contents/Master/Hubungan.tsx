import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { hubunganColumns } from './hubunganColumns';

export type HubunganType = {
  id: string;
  nama: string;
};

const endpoint = 'hubungan-penanggung-jawabs';

export const Hubungan = () => {
  const [dataHubungan, setDataHubungan] = useState<HubunganType[]>([]);
  const [hubungan, setHubungan] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
      setDataHubungan(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataHubungan]);

  const handleAdd = async () => {
    if (hubungan.trim()) {
      await axios.post(`${APP.API_URL}/${endpoint}`, {
        nama: hubungan,
      });
      setHubungan('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/${endpoint}/${id}`);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName="Hubungan Penanggung Jawab" />
      <h1 className="text-xl font-semibold">Hubungan Penanggung Jawab</h1>

      <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Hubungan"
            value={hubungan}
            onChange={(e) => setHubungan(e.target.value)}
          />
          <Button onClick={handleAdd}>Tambahkan</Button>
        </div>

        <DataTable
          columns={hubunganColumns(handleDelete)}
          data={dataHubungan}
        />
      </div>
    </>
  );
};
