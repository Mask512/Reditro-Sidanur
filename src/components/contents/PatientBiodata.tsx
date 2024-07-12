import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { calculateAge } from '@/utils/calculateAge';
import { PatientType } from '@/schema/schema';

type PatientBiodataProps = {
  patientData: PatientType | null;
};

const CardDetail = ({ label, value }: { label: string; value: string }) => (
  <CardDescription className="grid grid-cols-[165px_auto] text-base">
    {label}
    <span className="before:content-[':']"> {value}</span>
  </CardDescription>
);

export const PatientBiodata = ({ patientData }: PatientBiodataProps) => {
  if (!patientData) {
    return <>Memuat data pasien. . . </>;
  }

  const {
    alamat,
    jenisKelamin,
    nama,
    namaPenanggungJawab,
    nik,
    noTelp,
    noTelpDarurat,
    nomorPasien,
    tanggalLahir,
    tempatLahir,
    golonganDarah,
    hubunganPenanggungJawab,
    pekerjaan,
    pendidikan,
  } = patientData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{nama}</CardTitle>
        <CardDescription>
          {nomorPasien} / {jenisKelamin} / {calculateAge(tanggalLahir)}
        </CardDescription>
        <Separator />
      </CardHeader>
      <div className="flex flex-wrap">
        <CardContent>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Biodata
          </h4>
          <CardDetail
            label="Golongan Darah"
            value={golonganDarah?.nama || '-'}
          />
          <CardDetail label="Nomor KTP" value={nik} />
          <CardDetail
            label="Tempat, Tanggal Lahir"
            value={`${tempatLahir}, ${tanggalLahir}`}
          />
          <CardDetail label="Alamat" value={alamat} />
          <CardDetail label="Nomor Telepon" value={noTelp} />
          <CardDetail label="Pekerjaan" value={pekerjaan?.nama || '-'} />
          <CardDetail
            label="Pendidikan Terakhir"
            value={pendidikan?.nama || '-'}
          />
        </CardContent>

        <CardContent>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Penanggung Jawab
          </h4>
          <CardDetail
            label="Hubungan"
            value={hubunganPenanggungJawab?.nama || '-'}
          />
          <CardDetail label="Nama" value={namaPenanggungJawab} />
          <CardDetail label="Nomor Telepon" value={noTelpDarurat} />
        </CardContent>
      </div>
    </Card>
  );
};
