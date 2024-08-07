import { useEffect, useState } from 'react';
import { getRiwayatKB } from '@/data/api/api';
import { riwayatKBColumns } from './riwayatKB-columns';
import { PemeriksaanKBType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';

const parentLinks = [{ href: '/', label: 'Home' }];

const RiwayatKB = () => {
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
      <div className="space-y-4 max-w-4xl">
        <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Riwayat KB
        </h2>
        <DataTable
          columns={riwayatKBColumns()}
          data={riwayatKB}
          filterColumns={{
            key: 'pasien',
            placeholder: 'Cari Nama ...',
          }}
        />
      </div>
    </>
  );
};

export default RiwayatKB;
