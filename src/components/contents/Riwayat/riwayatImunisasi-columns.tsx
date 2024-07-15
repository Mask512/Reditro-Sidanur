import { PemeriksaanImunisasiType } from '@/schema/schema';
import { ColumnDef } from '@tanstack/react-table';

export const riwayatImunisasiColumns = (): ColumnDef<PemeriksaanImunisasiType>[] => [
  {
    accessorKey: 'pasien',
    header: 'Pasien',
    cell: ({ row }) => {
      const pasien = row.original.pasien;
      // needFix
      return pasien.nama;
    },
  },
  {
    accessorKey: 'tanggalImunisasi',
    header: 'Tanggal Imunisasi',
  },
  {
    accessorKey: 'jenisImunisasi',
    header: 'Jenis Imunisasi',
    cell: ({ row }) => {
      const jenisImunisasi = row.original.jenisImunisasi;
      return jenisImunisasi.nama;
    },
  },
  {
    accessorKey: 'tanggalKembaliImunisasi',
    header: 'Tanggal Kembali',
  },
  {
    accessorKey: 'bidan',
    header: 'Bidan',
    cell: ({ row }) => {
      const bidan = row.original.bidan;
      return bidan.nama;
    },
  },
];
