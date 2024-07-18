import { PersalinanType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

interface riwayatPersalinanColumnsProps {
  handleAction: (id: string) => React.ReactNode;
}

export const riwayatPersalinanColumns = (
  {handleAction}: riwayatPersalinanColumnsProps,
): ColumnDef<PersalinanType>[] => [
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
    accessorKey: 'tanggalPersalinan',
    header: 'Tanggal Persalinan',
    cell: (info) => formatDateID(info.getValue() as string),
  },
  {
    accessorKey: 'jamPersalinan',
    header: 'Waktu Persalinan',
  },
  {
    accessorKey: 'keadaanIbu',
    header: 'Keadaan Ibu',
  },
  {
    accessorKey: 'namaAnak',
    header: 'Nama Anak',
  },
  {
    accessorKey: 'keadaanAnak',
    header: 'Keadaan Anak',
  },
  {
    accessorKey: 'komplikasi',
    header: 'Komplikasi',
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
    cell: ({ row }) => handleAction(row.original.id as string),
  },
];
