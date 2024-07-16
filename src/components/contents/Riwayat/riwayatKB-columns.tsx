import { PemeriksaanKBType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const riwayatKBColumns = (): ColumnDef<PemeriksaanKBType>[] => [
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
    accessorKey: 'tanggalKB',
    header: 'Tanggal KB',
    cell: (info) => formatDateID(info.getValue() as string),
  },
  {
    accessorKey: 'jenisKB',
    header: 'Jenis KB',
    cell: ({ row }) => {
      const jenisKB = row.original.jenisKB;
      return jenisKB.nama;
    },
  },
  {
    accessorKey: 'tanggalKembaliKB',
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
