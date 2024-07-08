import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jenisImunisasiColumns } from './jenisImunisasiColumns';


const endpoint = 'jenis-imunisasis';

export type JenisImunisasiType = {
  id: string;
  nama: string;
};

export const JenisImunisasi = () => {
  const [dataJenis, setDataJenis] = useState<JenisImunisasiType[]>([]);
  const [JenisImunisasi, setJenisImunisasi] = useState('');

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
    setDataJenis(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, [setDataJenis]);

  const handleAdd = async () => {
    if (JenisImunisasi.trim()) {
      await axios.post(`${APP.API_URL}/${endpoint}`, {
        nama: JenisImunisasi,
      });
      setJenisImunisasi('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${APP.API_URL}/${endpoint}/${id}`);
    fetchData();
  };

  return (
    <>
    <BreadCrumb pageName="Jenis Imunisasi" />
    <div className="max-w-lg">
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Jenis Imunisasi"
            value={JenisImunisasi}
            onChange={(e) => setJenisImunisasi(e.target.value)}
          />
          <Button onClick={handleAdd}>Tambahkan</Button>
        </div>

        <DataTable
          columns={jenisImunisasiColumns(handleDelete)}
          data={dataJenis}
        />
      </div>
    </>
  )
}
