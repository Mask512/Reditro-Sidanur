import { useEffect, useState } from 'react';
import { getRiwayatNifas } from '@/data/api/api';
import { PemeriksaanNifasType } from '@/schema/schema';
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
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Riwayat Nifas
      </h2>
      <DataTable
        columns={riwayatNifasColumns()}
        data={riwayatNifas}
        filterColumns={{
          key: 'pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};
