import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getBidans, getJenisImunisasi } from '@/data/api/api';
import { PatientBiodata } from './PatientBiodata';
import {
  BidanType,
  PatientType,
  pemeriksaanImunisasiSchema,
  PemeriksaanImunisasiType,
} from '@/schema/schema';
import { Separator } from '@/components/ui/separator';
import { JenisImunisasiType } from './Master/JenisImunisasi';
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { APP } from '@/data/app';
import { Pasien } from '@/data/api/pasien';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/nifas', label: 'Form Imunisasi' },
];

export const ImunisasiForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const [bidans, setBidans] = useState<BidanType[]>([]);
  const [jenisImunisasi, setJenisImunisasi] = useState<JenisImunisasiType[]>(
    [],
  );
  const { toast } = useToast();

  const fetchBidans = async () => {
    const data = await getBidans();
    if (data) {
      setBidans(data);
    }
  };

  const fetchJenisImunisasi = async () => {
    const data = await getJenisImunisasi();
    if (data) {
      setJenisImunisasi(data);
    }
  };

  useEffect(() => {
    fetchBidans();
    fetchJenisImunisasi();
  }, []);

  const form = useForm<PemeriksaanImunisasiType>({
    resolver: zodResolver(pemeriksaanImunisasiSchema),
    defaultValues: {
      tanggalImunisasi: String(new Date().toISOString().split('T')[0]),
      beratBadan: '',
      panjangBadan: '',
      tanggalKembaliImunisasi: '',
    },
  });

  const onSubmit = async (values: PemeriksaanImunisasiType) => {
    const response = await axios.post(`${APP.API_URL}/imunisasis`, values);
    if (response.status === 201) {
      toast({
        description: 'Sukses. Data telah tersimpan!',
      });
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await Pasien.getPasienById(patientId);
        setPatientData(data);
        form.setValue('pasien', data);
      }
    };
    fetchPatient();
  }, [form, patientId]);

  return (
    <>
      <BreadCrumb
        pageName={`${patientData?.nama} (${patientData?.nomorPasien})`}
        parentLinks={parentLinks}
      />

      <div className="grid gap-4 max-w-4xl">
        <PatientBiodata patientData={patientData} />
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Imunisasi
          </h4>
          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 my-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tanggalImunisasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Imunisasi</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bidan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bidan</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = bidans.find(
                            (target) => target.id === value,
                          );
                          field.onChange(selected);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bidan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bidans.map((val) => (
                            <SelectItem key={val.id} value={val.id}>
                              {val.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beratBadan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Berat Badan</FormLabel>
                      <FormControl>
                        <Input placeholder="Kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="panjangBadan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Panjang Badan</FormLabel>
                      <FormControl>
                        <Input placeholder="cm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jenisImunisasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Imunisasi</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = jenisImunisasi.find(
                            (target) => target.id === value,
                          );
                          field.onChange(selected);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Jenis Imunisasi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jenisImunisasi.map((val) => (
                            <SelectItem key={val.id} value={val.id}>
                              {val.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggalKembaliImunisasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Kembali</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Simpan</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
