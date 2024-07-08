import { BreadCrumb } from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { hubunganColumns } from './hubunganColumns';
import { addHubungan, deleteHubungan, getHubungans } from '@/utils/api';

export type HubunganType = {
  id: string;
  nama: string;
};

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const Hubungan = () => {
  const [dataHubungan, setDataHubungan] = useState<HubunganType[]>([]);
  const [hubungan, setHubungan] = useState('');

  const fetchData = async () => {
    const data = await getHubungans();
    setDataHubungan(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataHubungan]);

  const handleAdd = async () => {
    if (hubungan.trim()) {
      await addHubungan(hubungan);
      setHubungan('');
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteHubungan(id);
    fetchData();
  };

  return (
    <>
      <BreadCrumb
        pageName="Hubungan Penanggung Jawab"
        parentLinks={parentLinks}
      />
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
