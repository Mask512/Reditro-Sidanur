import { useEffect, useState } from 'react';
import { getRiwayatImunisasi } from '@/utils/api';
import { PemeriksaanImunisasiType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatImunisasiColumns } from './riwayatImunisasi-columns';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatImunisasi = () => {
  const [riwayatImunisasi, setRiwayatImunisasi] = useState<PemeriksaanImunisasiType[]>([]);

  useEffect(() => {
    const fetchRiwayatKB = async () => {
      const data = await getRiwayatImunisasi();
      if (data) {
        setRiwayatImunisasi(data);
      }
    };
    fetchRiwayatKB();
  }, []);
  return (
    <>
      <BreadCrumb pageName="Riwayat Imunisasi" parentLinks={parentLinks} />
      <DataTable columns={riwayatImunisasiColumns()} data={riwayatImunisasi} />
    </>
  );
};
