import { useEffect, useState } from 'react';
import { getRiwayatKehamilan } from '@/utils/api';
import {  PemeriksaanKehamilanType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatKehamilanColumns } from './riwayatKehamilan-columns';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatKehamilan = () => {
  const [riwayatKehamilan, setRiwayatKehamilan] = useState<PemeriksaanKehamilanType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiwayatKehamilan();
      if (data) {
        setRiwayatKehamilan(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <BreadCrumb pageName="Riwayat Kehamilan" parentLinks={parentLinks} />
      <DataTable columns={riwayatKehamilanColumns()} data={riwayatKehamilan} />
    </>
  );
};
