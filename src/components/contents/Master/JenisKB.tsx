import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jenisKBColumns } from './jenisKBColumns';

export type JenisKBType = {
  id: string;
  nama: string;
};

const endpoint = 'jenis-kbs';

export const JenisKB = () => {
  const [dataJenis, setDataJenis] = useState<JenisKBType[]>([]);
  const [jenisKB, setJenisKB] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
      setDataJenis(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataJenis]);

  const handleAdd = async () => {
    if (jenisKB.trim()) {
      await axios.post(`${APP.API_URL}/${endpoint}`, {
        nama: jenisKB,
      });
      setJenisKB('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/${endpoint}/${id}`);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName="Jenis KB" />
      <h1 className="text-xl font-semibold">Jenis KB</h1>
      <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Jenis KB"
            value={jenisKB}
            onChange={(e) => setJenisKB(e.target.value)}
          />
          <Button onClick={handleAdd}>Tambahkan</Button>
        </div>

        <DataTable
          columns={jenisKBColumns(handleDelete)}
          data={dataJenis}
        />
      </div>
    </>
  );
};
