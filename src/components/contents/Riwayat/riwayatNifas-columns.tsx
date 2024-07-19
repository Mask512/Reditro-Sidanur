import { PemeriksaanNifasType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';

interface riwayatNifasColumnsProps {
  handleAction: (id: string) => React.ReactNode;
}

export const riwayatNifasColumns = ({
  handleAction,
}: riwayatNifasColumnsProps): ColumnDef<PemeriksaanNifasType>[] => [
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
    accessorKey: 'hariKe',
    header: 'Hari Ke',
  },
  {
    accessorKey: 'keluhan',
    header: 'Keluhan',
  },
  {
    accessorKey: 'diagnosa',
    header: 'Diagnosa',
  },
  {
    accessorKey: 'planningObat',
    header: 'Obat',
  },
  {
    accessorKey: 'planningTindakan',
    header: 'Planning Tindakan',
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
