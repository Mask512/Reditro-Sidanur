import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getBidans, getGolonganDarahs, getPatientById } from '@/utils/api';
import { PatientBiodata } from './PatientBiodata';
import {
  BidanType,
  GolonganDarahType,
  PatientType,
  persalinanSchema,
  PersalinanType,
} from '@/schema/schema';
import { Separator } from '@/components/ui/separator';
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { APP } from '@/data/app';
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

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/persalinan', label: 'Persalinan' },
];

export const PersalinanForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const [bidans, setBidans] = useState<BidanType[]>([]);
  const [golonganDarah, setGolonganDarah] = useState<GolonganDarahType[]>([]);
  const { toast } = useToast();

  const fetchBidans = async () => {
    const data = await getBidans();
    if (data) {
      setBidans(data);
    }
  };

  const fetchGolonganDarah = async () => {
    const data = await getGolonganDarahs();
    if (data) {
      setGolonganDarah(data);
    }
  };

  useEffect(() => {
    fetchBidans();
    fetchGolonganDarah();
  }, []);

  const form = useForm<PersalinanType>({
    resolver: zodResolver(persalinanSchema),
    defaultValues: {
      beratBadan: '',
      imd: 'YES',
      jamPersalinan: '',
      jenisKelaminAnak: 'LAKI_LAKI',
      keadaanAnak: 'HIDUP',
      keadaanIbu: 'HIDUP',
      namaAnak: '',
      panjangBadanAnak: '',
      komplikasi: '',
      vitaminK: 'YES',
      resusitasi: '',
      tanggalPersalinan: String(new Date().toISOString().split('T')[0]),
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await getPatientById(patientId);
        setPatientData(data);
        form.setValue('pasien', data);
      }
    };
    fetchPatient();
  }, [patientId, form]);

  const onSubmit = async (values: PersalinanType) => {
    const response = await axios.post(`${APP.API_URL}/persalinans`, values);

    if (response.status === 201) {
      toast({
        description: 'Sukses. Data telah tersimpan!',
      });
    }
  };

  return (
    <>
      <BreadCrumb
        pageName={`${patientData?.nama} (${patientData?.nomorPasien})`}
        parentLinks={parentLinks}
      />
      <div className="grid gap-4 max-w-4xl">
        <PatientBiodata patientData={patientData} />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Persalinan
        </h4>
        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 my-4"
          >
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="tanggalPersalinan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Persalinan</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jamPersalinan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Persalinan</FormLabel>
                    <FormControl>
                      <Input placeholder="HH:MM" {...field} />
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
                name="namaAnak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Anak</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama anak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenisKelaminAnak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin Anak</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LAKI_LAKI">Laki-Laki</SelectItem>
                        <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keadaanAnak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keadaan Lahir</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Keadaan Anak" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HIDUP">Hidup</SelectItem>
                        <SelectItem value="MENINGGAL">Meninggal</SelectItem>
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
                      <Input placeholder="gram" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="panjangBadanAnak"
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
                name="golonganDarah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Golongan Darah</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selected = golonganDarah.find(
                          (target) => target.id === value,
                        );
                        field.onChange(selected);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Golongan Darah" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {golonganDarah.map((val) => (
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
                name="resusitasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resusitasi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Resusitasi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YES">Ya</SelectItem>
                        <SelectItem value="NO">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IMD</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="IMD" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YES">Ya</SelectItem>
                        <SelectItem value="NO">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vitaminK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vitamin K</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vitamin K" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="YES">Ya</SelectItem>
                        <SelectItem value="NO">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="komplikasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Komplikasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Komplikasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keadaanIbu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keadaan Ibu</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Keadaan Ibu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HIDUP">Hidup</SelectItem>
                        <SelectItem value="MENINGGAL">Meninggal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </div>
    </>
  );
};
