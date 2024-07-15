import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getBidans } from '@/data/api/api';
import { PatientBiodata } from './PatientBiodata';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Separator } from '@/components/ui/separator';
import {
  BidanType,
  PatientType,
  pemeriksaanNifasSchema,
  PemeriksaanNifasType,
} from '@/schema/schema';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { APP } from '@/data/app';
import { Pasien } from '@/data/api/pasien';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/nifas', label: 'Pemeriksaan Nifas' },
];

export const NifasForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const [bidans, setBidans] = useState<BidanType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBidans = async () => {
      const data = await getBidans();
      if (data) {
        setBidans(data);
      }
    };
    fetchBidans();
  }, []);

  const form = useForm<PemeriksaanNifasType>({
    resolver: zodResolver(pemeriksaanNifasSchema),
    defaultValues: {
      tanggalPemeriksaan: String(new Date().toISOString().split('T')[0]),
      hariKe: '',
      keluhan: '',
      ttvTekananDarah: '',
      ttvNadi: '',
      ttvSuhu: '',
      ttvRespirasi: '',
      ttvSPO2: '',
      ttvBeratBdan: '',
      ttvTinggiBadan: '',
      diagnosa: '',
      planningAsuhan: '',
      planningObat: '',
      planningTindakan: '',
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await Pasien.getPasienById(patientId);
        setPatientData(data);
        form.setValue('pasien', data);
      }
    };
    fetchPatient();
  }, [patientId, form]);

  const onSubmit = async (values: PemeriksaanNifasType) => {
    const response = await axios.post(
      `${APP.API_URL}/pemeriksaan-nifas`,
      values,
    );

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
          Form Pemeriksaan Nifas
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
                name="tanggalPemeriksaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pemeriksaan</FormLabel>
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
                name="hariKe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari ke:</FormLabel>
                    <FormControl>
                      <Input placeholder="hari ke :" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keluhan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keluhan</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <h3 className="font-semibold underline underline-offset-4">
                  Tanda Tanda vital
                </h3>
              </div>
              <FormField
                control={form.control}
                name="ttvBeratBdan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berat Badan</FormLabel>
                    <FormControl>
                      <Input placeholder="kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvTinggiBadan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tinggi Badan</FormLabel>
                    <FormControl>
                      <Input placeholder="cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvTekananDarah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tekanan Darah</FormLabel>
                    <FormControl>
                      <Input placeholder="mmHg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvNadi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nadi</FormLabel>
                    <FormControl>
                      <Input placeholder="x/mnt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvSuhu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suhu</FormLabel>
                    <FormControl>
                      <Input placeholder="c" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvRespirasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respirasi</FormLabel>
                    <FormControl>
                      <Input placeholder="x/mnt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttvSPO2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SPO2</FormLabel>
                    <FormControl>
                      <Input placeholder="%" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <h3 className="font-semibold underline underline-offset-4">
                  Planning
                </h3>
              </div>
              <FormField
                control={form.control}
                name="diagnosa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosa</FormLabel>
                    <FormControl>
                      <Input placeholder="Diagnosa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planningAsuhan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asuhan</FormLabel>
                    <FormControl>
                      <Input placeholder="Asuhan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planningObat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Obat</FormLabel>
                    <FormControl>
                      <Input placeholder="Obat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planningTindakan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tindakan</FormLabel>
                    <FormControl>
                      <Input placeholder="Tindakan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
