import { useEffect, useState } from 'react';
import { getRiwayatKehamilan } from '@/data/api/api';
import { PemeriksaanKehamilanType } from '@/schema/schema';
import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { riwayatKehamilanColumns } from './riwayatKehamilan-columns';
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

const RiwayatKehamilan = () => {
  const [riwayatKehamilan, setRiwayatKehamilan] = useState<
    PemeriksaanKehamilanType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRiwayatKehamilan();
      if (data) {
        setRiwayatKehamilan(data);
      }
    };
    fetchData();
  }, []);

  const handleAction = (id: string): React.ReactNode => {
    const selectedPemeriksaan = riwayatKehamilan.find((item) => item.id === id);
    if (!selectedPemeriksaan) {
      return null;
    }
    const {
      tanggalPemeriksaan,
      anamnesa,
      ttvTekananDarah,
      ttvNadi,
      ttvSuhu,
      ttvRespirasi,
      ttvSPO2,
      ttvBeratBdan,
      ttvTinggiBadan,
      riwayatKehamilanGPA1,
      riwayatKehamilanGPA2,
      riwayatKehamilanGPA3,
      riwayatKehamilanHPHT,
      riwayatKehamilanTPorHPL,
      pemeriksaanUsiaKehamilan,
      pemeriksaanTFU,
      pemeriksaanLILA,
      pemeriksaanDJJ,
      diagnosa,
      planningAsuhan,
      planningObat,
      planningTindakan,
      letakBayi,
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
                <p>Anamnesa </p>
                <p>: {anamnesa}</p>
                <p>Tekanan Darah </p>
                <p>: {ttvTekananDarah} mmHg</p>
                <p>Nadi </p>
                <p>: {ttvNadi} bpm</p>
                <p>Suhu </p>
                <p>: {ttvSuhu} c</p>
                <p>Respirasi </p>
                <p>: {ttvRespirasi} x/mnt</p>
                <p>SPO2 </p>
                <p>: {ttvSPO2} %</p>
                <p>Berat Badan </p>
                <p>: {ttvBeratBdan} kg</p>
                <p>Tinggi Badan </p>
                <p>: {ttvTinggiBadan} cm</p>
                <p>G / P / A </p>
                <p>
                  : {riwayatKehamilanGPA1} / {riwayatKehamilanGPA2} /{' '}
                  {riwayatKehamilanGPA3}
                </p>
                <p>HPHT </p>
                <p>: {formatDateID(riwayatKehamilanHPHT)}</p>
                <p>HPL </p>
                <p>: {formatDateID(riwayatKehamilanTPorHPL)}</p>
                <p>Usia Kehamilan </p>
                <p>: {pemeriksaanUsiaKehamilan}</p>
                <p>TFU </p>
                <p>: {pemeriksaanTFU} cm</p>
                <p>LILA </p>
                <p>: {pemeriksaanLILA} cm</p>
                <p>DJJ </p>
                <p>: {pemeriksaanDJJ} bpm</p>
                <p>Diagnosa </p>
                <p>: {diagnosa}</p>
                <p>Asuhan </p>
                <p>: {planningAsuhan}</p>
                <p>Obat </p>
                <p>: {planningObat}</p>
                <p>Tindakan </p>
                <p>: {planningTindakan}</p>
                <p>Letak Bayi </p>
                <p>: {letakBayi}</p>
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
      <BreadCrumb pageName="Riwayat Kehamilan" parentLinks={parentLinks} />
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Riwayat Kehamilan
      </h2>
      <DataTable
        columns={riwayatKehamilanColumns({ handleAction })}
        data={riwayatKehamilan}
        filterColumns={{
          key: 'pasien',
          placeholder: 'Cari Nama ...',
        }}
      />
    </>
  );
};

export default RiwayatKehamilan;
