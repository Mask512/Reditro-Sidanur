import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';
import { golonganDarahColumns } from './golonganDarahColumns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  addGolonganDarah,
  deleteGolonganDarah,
  getGolonganDarahs,
} from '@/utils/api';
import { GolonganDarahType } from '@/schema/schema';

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const GolonganDarah = () => {
  const [dataDarah, setDataDarah] = useState<GolonganDarahType[]>([]);
  const [golonganDarah, setGolonganDarah] = useState('');

  const fetchData = async () => {
    const data = await getGolonganDarahs();
    setDataDarah(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataDarah]);

  const handleDelete = async (id: string) => {
    await deleteGolonganDarah(id);
    fetchData();
  };

  const handleUpdate = async () => {
    if (golonganDarah.trim()) {
      await addGolonganDarah(golonganDarah);
      setGolonganDarah('');
      fetchData();
    }
  };

  return (
    <>
      <BreadCrumb pageName="Golongan Darah" parentLinks={parentLinks} />
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
