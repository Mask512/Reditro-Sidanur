import { Button } from '@/components/ui/button';
import { PemeriksaanKehamilanType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const riwayatKehamilanColumns =
  (): ColumnDef<PemeriksaanKehamilanType>[] => [
    {
      id: 'Nomor RM',
      header: 'Nomor RM',
      cell: ({ row }) => {
        const pasien = row.original.pasien;
        return pasien.nomorPasien;
      },
    },
    {
      id: 'pasien',
      accessorFn: (row) => row.pasien.nama,
      header: 'Pasien',
    },
    {
      accessorKey: 'tanggalPemeriksaan',
      header: 'Tanggal Pemeriksaan',
      cell: (info) => formatDateID(info.getValue() as string),
    },
    {
      accessorKey: 'riwayatKehamilanHPHT',
      header: 'Tanggal HPHT',
      cell: (info) => formatDateID(info.getValue() as string),
    },
    {
      accessorKey: 'pemeriksaanUsiaKehamilan',
      header: 'Usia Kehamilan',
      cell: ({ row }) => {
        const usia = row.original.pemeriksaanUsiaKehamilan;
        return `${usia} minggu`;
      },
    },
    {
      accessorKey: 'riwayatKehamilanTPorHPL',
      header: 'HPL',
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
    {
      id: 'action',
      cell: ({ row }) => {
        const id = row.original.pasien.id;
        return <Button onClick={() => alert(id)}>Detail</Button>;
      },
    },
  ];
