import { ColumnDef } from '@tanstack/react-table';
import { daysUntil, FormattedDataRow } from '@/utils/formatReminderData';
import { Button } from '../ui/button';
import { MessageSquareMore } from 'lucide-react';
import { formatDateID, formatPhoneNumber } from '@/utils/formatter';
import { Badge } from '../ui/badge';

const sendWhatsAppMessage = (nomorTelepon: string, isiPesan: string) => {
  const noHp = formatPhoneNumber(nomorTelepon);
  const encodedMessage = encodeURIComponent(isiPesan);
  const whatsappUrl = `https://wa.me/${noHp}?text=${encodedMessage}`;
  window.location.href = whatsappUrl;
};

export const pengingatColumns = (): ColumnDef<FormattedDataRow>[] => [
  {
    accessorKey: 'Tanggal Kembali',
    header: 'Tanggal Pengingat',
    cell: (info) => formatDateID(info.getValue() as string),
  },
  {
    id: 'Sisa hari',
    header: 'Sisa hari',
    cell: ({ row }) => {
      const date = row.original['Tanggal Kembali'];

      if (date) {
        const daysLeft = daysUntil(date);
        return daysLeft == 0 ? (
          <Badge>Hari ini</Badge>
        ) : daysLeft <= 0 ? (
          'Baru saja'
        ) : (
          `${daysLeft} hari lagi`
        );
      }
      return '';
    },
  },
  {
    accessorKey: 'Nama Pasien',
    header: 'Nama Pasien',
  },
  {
    accessorKey: 'Jenis Pemeriksaan',
    header: 'Jenis Pemeriksaan',
  },
  {
    accessorKey: 'Tindakan',
    header: 'Nama Pemeriksaan',
    cell: ({ row }) =>
      row.original.Tindakan === 'Pemeriksaan Kehamilan'
        ? 'Estimasi Kelahiran'
        : row.original.Tindakan,
  },
  {
    accessorKey: 'Nomor Telepon Pasien',
    header: 'Nomor Telepon',
  },
  {
    id: 'Action',
    cell: ({ row }) => {
      const noHp = formatPhoneNumber(row.original['Nomor Telepon Pasien']);
      const namaPasien = row.original['Nama Pasien'];
      const defaultMessage = `Halo ${namaPasien}. Kami dari Praktek Bidan Mandiri`;
      return (
        <Button onClick={() => sendWhatsAppMessage(noHp, defaultMessage)}>
          <MessageSquareMore className="w-4 h-4 mr-4" />
          Ingatkan
        </Button>
      );
    },
  },
];
