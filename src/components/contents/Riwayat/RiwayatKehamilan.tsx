import { useEffect, useState } from 'react';
import { getRiwayatKehamilan } from '@/data/api/api';
import { PemeriksaanKehamilanType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatKehamilanColumns } from './riwayatKehamilan-columns';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatKehamilan = () => {
  const [riwayatKehamilan, setRiwayatKehamilan] = useState<
    PemeriksaanKehamilanType[]
  >([]);

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
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Riwayat Kehamilan
      </h2>
      <DataTable
        columns={riwayatKehamilanColumns()}
        data={riwayatKehamilan}
        filterColumns={{
          key: 'pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};
