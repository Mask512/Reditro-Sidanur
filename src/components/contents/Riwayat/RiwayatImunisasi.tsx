import { useEffect, useState } from 'react';
import { getRiwayatImunisasi } from '@/data/api/api';
import { PemeriksaanImunisasiType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatImunisasiColumns } from './riwayatImunisasi-columns';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatImunisasi = () => {
  const [riwayatImunisasi, setRiwayatImunisasi] = useState<
    PemeriksaanImunisasiType[]
  >([]);

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
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Riwayat Imunisasi
      </h2>
      <DataTable
        columns={riwayatImunisasiColumns()}
        data={riwayatImunisasi}
        filterColumns={{
          key: 'pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};
