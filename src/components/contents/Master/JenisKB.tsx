import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { jenisKBColumns } from './jenisKBColumns';
import { addJenisKB, deleteJenisKB, getJenisKBs } from '@/data/api/api';
import { JenisKBType } from '@/schema/schema';

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const JenisKB = () => {
  const [dataJenis, setDataJenis] = useState<JenisKBType[]>([]);
  const [jenisKB, setJenisKB] = useState('');

  const fetchData = async () => {
    const data = await getJenisKBs();
    setDataJenis(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataJenis]);

  const handleAdd = async () => {
    if (jenisKB.trim()) {
      await addJenisKB(jenisKB);
      setJenisKB('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteJenisKB(id);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName="Jenis KB" parentLinks={parentLinks}/>
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
