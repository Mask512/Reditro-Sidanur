import { useEffect, useState } from 'react';
import { getRiwayatKB } from '@/data/api/api';
import { riwayatKBColumns } from './riwayatKB-columns';
import { PemeriksaanKBType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatKB = () => {
  const [riwayatKB, setRiwayatKB] = useState<PemeriksaanKBType[]>([]);

  useEffect(() => {
    const fetchRiwayatKB = async () => {
      const data = await getRiwayatKB();
      if (data) {
        setRiwayatKB(data);
      }
    };
    fetchRiwayatKB();
  }, []);
  return (
    <>
      <BreadCrumb pageName="Riwayat KB" parentLinks={parentLinks} />
      <DataTable columns={riwayatKBColumns()} data={riwayatKB} />
    </>
  );
};
