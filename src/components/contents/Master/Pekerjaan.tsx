import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { pekerjaanColumns } from './pekerjaanColumns';
import { addPekerjaan, deletePekerjaan, getPekerjaans } from '@/data/api/api';

export type PekerjaanType = {
  id: string;
  nama: string;
};
const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const Pekerjaan = () => {
  const [dataPekerjaan, setDataPekerjaan] = useState<PekerjaanType[]>([]);
  const [pekerjaan, setPekerjaan] = useState('');

  const fetchData = async () => {
    const data = await getPekerjaans();
    setDataPekerjaan(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataPekerjaan]);

  const handleAdd = async () => {
    if (pekerjaan.trim()) {
      await addPekerjaan(pekerjaan);
      setPekerjaan('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await deletePekerjaan(id);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName="Pekerjaan" parentLinks={parentLinks} />
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
