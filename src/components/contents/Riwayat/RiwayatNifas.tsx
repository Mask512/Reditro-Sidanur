import { useEffect, useState } from 'react';
import { getRiwayatNifas } from '@/data/api/api';
import { PemeriksaanNifasType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatNifasColumns } from './riwayatNifas-columns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateID } from '@/utils/formatter';

const parentLinks = [{ href: '/', label: 'Home' }];

export const RiwayatNifas = () => {
  const [riwayatNifas, setRiwayatNifas] = useState<PemeriksaanNifasType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiwayatNifas();
      if (data) {
        setRiwayatNifas(data);
      }
    };
    fetchData();
  }, []);

  const handleAction = (id: string): React.ReactNode => {
    const selectedPemeriksaan = riwayatNifas.find((item) => item.id === id);
    if (!selectedPemeriksaan) {
      return null;
    }
    const {
      tanggalPemeriksaan,
      hariKe,
      keluhan,
      ttvTekananDarah,
      ttvNadi,
      ttvSuhu,
      ttvRespirasi,
      ttvSPO2,
      ttvBeratBdan,
      ttvTinggiBadan,
      diagnosa,
      planningAsuhan,
      planningObat,
      planningTindakan,
      bidan,
      pasien,
    } = selectedPemeriksaan;

    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Detail</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semiboldbold text-2xl">
                Riwayat Pemeriksaan
              </DialogTitle>
              <DialogDescription className="hidden sr-only">
                Riwayat pemeriksaan
              </DialogDescription>
            </DialogHeader>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  {pasien.nama} /{' '}
                  <span className="text-muted-foreground">
                    {pasien.nomorPasien}
                  </span>
                </CardTitle>
                <CardDescription className="hidden sr-only">
                  Detail riwayat
                </CardDescription>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent className="grid grid-cols-2">
                <p>Tanggal Pemeriksaan </p>
                <p>: {formatDateID(tanggalPemeriksaan)}</p>
                <p>Hari ke </p>
                <p>: {hariKe}</p>
                <p>Keluhan </p>
                <p>: {keluhan}</p>
                <p>Tekanan Darah </p>
                <p>: {ttvTekananDarah}</p>
                <p>Nadi </p>
                <p>: {ttvNadi}</p>
                <p>Suhu </p>
                <p>: {ttvSuhu}</p>
                <p>Respirasi </p>
                <p>: {ttvRespirasi}</p>
                <p>SPO2 </p>
                <p>: {ttvSPO2} %</p>
                <p>Berat Badan </p>
                <p>: {ttvBeratBdan} kg</p>
                <p>Tinggi Badan </p>
                <p>: {ttvTinggiBadan} cm</p>

                <p>Diagnosa </p>
                <p>: {diagnosa}</p>
                <p>Asuhan </p>
                <p>: {planningAsuhan}</p>
                <p>Obat </p>
                <p>: {planningObat}</p>
                <p>Tindakan </p>
                <p>: {planningTindakan}</p>

                <p>Bidan Pemeriksa </p>
                <p>: {bidan.nama}</p>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <BreadCrumb pageName="Riwayat Nifas" parentLinks={parentLinks} />
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Riwayat Nifas
      </h2>
      <DataTable
        columns={riwayatNifasColumns({ handleAction })}
        data={riwayatNifas}
        filterColumns={{
          key: 'pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};
