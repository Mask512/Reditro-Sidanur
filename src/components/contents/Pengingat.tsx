import { useEffect, useState } from 'react';
import { BreadCrumb } from '../BreadCrumb';
import {
  getRiwayatImunisasi,
  getRiwayatKB,
  getRiwayatKehamilan,
} from '@/data/api/api';
import {
  PemeriksaanImunisasiType,
  PemeriksaanKBType,
  PemeriksaanKehamilanType,
} from '@/schema/schema';
import {
  formatDataToTable,
  FormattedDataRow,
} from '@/utils/formatReminderData';
import { DataTable } from '../ui/data-table';
import { pengingatColumns } from './pengingat-Columns';

const parentLinks = [{ href: '/', label: 'Home' }];

const Pengingat = () => {
  const [reminderData, setReminderData] = useState<FormattedDataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKB = await getRiwayatKB();
        const responseImunisasi = await getRiwayatImunisasi();
        const responseKehamilan = await getRiwayatKehamilan();

        const mergedData = [
          ...responseKB.map((item: PemeriksaanKBType) => ({
            ...item,
            jenisPemeriksaan: 'KB',
            tindakan: item.jenisKB.nama,
          })),
          ...responseImunisasi.map((item: PemeriksaanImunisasiType) => ({
            ...item,
            jenisPemeriksaan: 'Imunisasi',
            tindakan: item.jenisImunisasi.nama,
          })),
          ...responseKehamilan.map((item: PemeriksaanKehamilanType) => ({
            ...item,
            jenisPemeriksaan: 'Kehamilan',
            tindakan: 'Pemeriksaan Kehamilan',
          })),
        ];

        const formattedData = formatDataToTable(mergedData);
        setReminderData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error fetching data
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BreadCrumb pageName="Pengingat Pasien" parentLinks={parentLinks} />
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Pengingat
      </h2>
      <DataTable
        columns={pengingatColumns()}
        data={reminderData}
        filterColumns={{
          key: 'Nama Pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};

export default Pengingat;
