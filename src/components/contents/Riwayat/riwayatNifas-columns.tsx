import { Button } from '@/components/ui/button';
import { PemeriksaanNifasType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import { ColumnDef } from '@tanstack/react-table';

export const riwayatNifasColumns = (): ColumnDef<PemeriksaanNifasType>[] => [
  {
    accessorKey: 'tanggalPemeriksaan',
    header: 'Tanggal Pemeriksaan',
    cell: (info) => formatDateID(info.getValue() as string),
  },
  {
    id: 'Nomor RM',
    header: 'Nomor RM',
    cell: ({ row }) => {
      const pasien = row.original.pasien;
      return pasien.nomorPasien;
    },
  },
  {
    accessorKey: 'pasien',
    header: 'Pasien',
    cell: ({ row }) => {
      const pasien = row.original.pasien;
      return pasien.nama;
    },
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
    cell: ({ row }) => {
      const id = row.original.pasien.id;
      return (
        <Button onClick={()=> alert(id)}>Detail</Button>
      );
    },
  },
];
