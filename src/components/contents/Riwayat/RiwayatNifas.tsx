import { useEffect, useState } from 'react';
import { getRiwayatNifas } from '@/utils/api';
import {  PemeriksaanNifasType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatNifasColumns } from './riwayatNifas-columns';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatNifas = () => {
  const [riwayatNifas, setRiwayatNifas] = useState<PemeriksaanNifasType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiwayatNifas();
      if (data) {
        setRiwayatNifas(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <BreadCrumb pageName="Riwayat Nifas" parentLinks={parentLinks} />
      <DataTable columns={riwayatNifasColumns()} data={riwayatNifas} />
    </>
  );
};
