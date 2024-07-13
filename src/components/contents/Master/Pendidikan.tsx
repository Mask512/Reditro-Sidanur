import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { pendidikanColumns } from './pendidikanColumn';
import { addPendidikan, deletePendidikan, getPendidikans } from '@/data/api/api';

export type PendidikanType = {
  id: string;
  nama: string;
};

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const Pendidikan = () => {
  const [dataPendidikan, setDataPendidikan] = useState<PendidikanType[]>([]);
  const [pendidikan, setPendidikan] = useState('');

  const fetchData = async () => {
    const data = await getPendidikans();
      setDataPendidikan(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataPendidikan])

  const handleAdd = async ()=> {
    if (pendidikan.trim()) {
      await addPendidikan(pendidikan);
      setPendidikan('');
      fetchData();
    }
  }

  const handleDelete = async (id: string) => {
    await deletePendidikan(id);
    fetchData();
  };


  return (
    <>
      <BreadCrumb pageName="Pendidikan" parentLinks={parentLinks}/>
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
