import { getDataPraktek, getRiwayatPersalinanById } from '@/data/api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { formatDateID } from '@/utils/formatter';
import { LokasiPraktekType, PersalinanType } from '@/schema/schema';
import { PrintSuratKelahiran } from '@/pages/PrintSuratKelahiran';
import { PDFViewer } from '@react-pdf/renderer';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export const DetailPersalinan = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [dataRiwayat, setDataRiwayat] = useState<PersalinanType | null>(null);
  const [lokasiPraktek, setLokasiPraktek] = useState<LokasiPraktekType | null>(
    null,
  );
  const [qrCodeURI, setQrCodeURI] = useState<string>(
    'data:image/jpeg;base64,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',
  );

  useEffect(() => {
    const fetchData = async () => {
      const dataPersalinan = await getRiwayatPersalinanById(patientId!);
      if (dataPersalinan) {
        setDataRiwayat(dataPersalinan);
      }

      const dataLokasiPraktek = await getDataPraktek();
      if (dataLokasiPraktek.length) {
        setLokasiPraktek(dataLokasiPraktek[0]);
      }
    };

    fetchData();
  }, [patientId]);

  useEffect(() => {
    const generateQRCode = () => {
      const qrCodeCanvas = document.querySelector('canvas');
      if (qrCodeCanvas) {
        const qrCodeDataUri = qrCodeCanvas.toDataURL('image/jpeg', 0.3);
        setQrCodeURI(qrCodeDataUri);
      }
    };

    generateQRCode();
  }, [dataRiwayat]);

  return (
    dataRiwayat && (
      <>
        <Card className="max-w-lg mx-auto p-4">
          <CardTitle className="font-bold text-center my-4">
            Detail Kelahiran
          </CardTitle>
          <Separator className="my-4" />
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold">Nama Anak:</label>
                <p>{dataRiwayat.namaAnak}</p>
              </div>
              <div>
                <label className="font-bold">Tanggal Persalinan:</label>
                <p>{formatDateID(dataRiwayat.tanggalPersalinan)}</p>
              </div>
              <div>
                <label className="font-bold">Jam Persalinan:</label>
                <p>{dataRiwayat.jamPersalinan} WIB</p>
              </div>
              <div>
                <label className="font-bold">Jenis Kelamin Anak:</label>
                <p>
                  {dataRiwayat.jenisKelaminAnak === 'LAKI_LAKI'
                    ? 'Laki laki'
                    : 'Perempuan'}
                </p>
              </div>
              <div>
                <label className="font-bold">Berat Badan Anak:</label>
                <p>{dataRiwayat.beratBadanAnak} gram</p>
              </div>
              <div>
                <label className="font-bold">Panjang Badan Anak:</label>
                <p>{dataRiwayat.panjangBadanAnak} cm</p>
              </div>
              <div>
                <label className="font-bold">Keadaan Anak:</label>
                <p>{dataRiwayat.keadaanAnak}</p>
              </div>
              <div>
                <label className="font-bold">Keadaan Ibu:</label>
                <p>{dataRiwayat.keadaanIbu}</p>
              </div>
              <div>
                <label className="font-bold">Golongan Darah:</label>
                <p>{dataRiwayat.golonganDarah?.nama}</p>
              </div>
              <div>
                <label className="font-bold">Resusitasi:</label>
                <p>{dataRiwayat.resusitasi === 'YES' ? 'Ya' : 'Tidak'}</p>
              </div>
              <div>
                <label className="font-bold">Inisiasi Menyusui Dini:</label>
                <p>{dataRiwayat.imd === 'YES' ? 'Ya' : 'Tidak'}</p>
              </div>
              <div>
                <label className="font-bold">Vitamin K:</label>
                <p>{dataRiwayat.vitaminK === 'YES' ? 'Ya' : 'Tidak'}</p>
              </div>
              <div>
                <label className="font-bold">Nama Ibu:</label>
                <p>{dataRiwayat.pasien.nama}</p>
              </div>
              <div>
                <label className="font-bold">Alamat Ibu:</label>
                <p>{dataRiwayat.pasien.alamat}</p>
              </div>
              <div>
                <label className="font-bold">Tanggal Lahir Ibu:</label>
                <p>{formatDateID(dataRiwayat.pasien.tanggalLahir)}</p>
              </div>
              <div>
                <label className="font-bold">Nomor Telepon Ibu:</label>
                <p>{dataRiwayat.pasien.noTelp}</p>
              </div>
              <div>
                <label className="font-bold">Nama Penanggung Jawab:</label>
                <p>{dataRiwayat.pasien.namaPenanggungJawab}</p>
              </div>
              <div>
                <label className="font-bold">Nomor Telepon:</label>
                <p>{dataRiwayat.pasien.noTelpDarurat}</p>
              </div>
            </div>
            <div className="hidden">
              <QRCodeCanvas
                value={`Digital signature generated by Reditro Si Danur.
                Bidan : ${dataRiwayat.bidan.nama}
                Pasien: ${dataRiwayat.pasien.nama}
                Tanggal: ${dataRiwayat.tanggalPersalinan}`}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Print Surat</Button>
              </DialogTrigger>
              <DialogContent className="min-w-full h-screen">
                <DialogHeader>
                  <DialogTitle>Print Surat</DialogTitle>
                  <DialogDescription>
                    Print atau download surat keterangan lahir.
                  </DialogDescription>
                  <PDFViewer height="100%" width="100%">
                    <PrintSuratKelahiran lokasi={lokasiPraktek} data={dataRiwayat} image={qrCodeURI} />
                  </PDFViewer>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </>
    )
  );
};
