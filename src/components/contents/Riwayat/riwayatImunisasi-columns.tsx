import { PemeriksaanImunisasiType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const riwayatImunisasiColumns = (): ColumnDef<PemeriksaanImunisasiType>[] => [
  {
    accessorKey: 'pasien',
    header: 'Pasien',
    cell: ({ row }) => {
      const pasien = row.original.pasien;
      return pasien.nama;
    },
  },
  {
    accessorKey: 'tanggalImunisasi',
    header: 'Tanggal Imunisasi',
    cell: (info) => formatDateID(info.getValue() as string),
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
    cell: (info) => formatDateID(info.getValue() as string),
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
