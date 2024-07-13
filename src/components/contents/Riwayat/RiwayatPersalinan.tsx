import { useEffect, useState } from 'react';
import { PersalinanType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatPersalinanColumns } from './riwayatPersalinan-columns';
import { getRiwayatPersalinan } from '@/data/api/api';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatPersalinan = () => {
  const [persalinan, setPersalinan] = useState<PersalinanType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiwayatPersalinan();
      if (data) {
        setPersalinan(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <BreadCrumb pageName="Riwayat Nifas" parentLinks={parentLinks} />
      <DataTable columns={riwayatPersalinanColumns()} data={persalinan} />
    </>
  );
};
