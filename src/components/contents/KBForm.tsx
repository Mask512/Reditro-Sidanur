import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getBidans, getJenisKBs, getPatientById } from '@/utils/api';
import { PatientBiodata } from './PatientBiodata';
import { z } from 'zod';
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
  JenisKBType,
  PatientType,
  pemeriksaanKBSchema,
} from '@/schema/schema';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { APP } from '@/data/app';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/nifas', label: 'Keluarga Berencana' },
];

export const KBForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const [bidans, setBidans] = useState<BidanType[]>([]);
  const [jenisKB, setJenisKB] = useState<JenisKBType[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof pemeriksaanKBSchema>>({
    resolver: zodResolver(pemeriksaanKBSchema),
    defaultValues: {
      tanggalKB: String(new Date().toISOString().split('T')[0]),
      beratBadan: '',
      tinggiBadan: '',
      tanggalKembaliKB: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof pemeriksaanKBSchema>) => {
    const data = { ...values, pasien: patientData };
    const response = await axios.post(
      `${APP.API_URL}/keluarga-berencanas`,
      data,
    );
    if (response.status === 201) {
      toast({
        description: 'Sukses. Data telah tersimpan!',
      });
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await getPatientById(patientId);
        setPatientData(data);
        form.setValue('pasien', data)
      }
    };
    fetchPatient();
  }, [form, patientId]);

  useEffect(() => {
    const fetchBidans = async () => {
      const data = await getBidans();
      if (data) {
        setBidans(data);
      }
    };

    const fetchJenisKb = async () => {
      const data = await getJenisKBs();
      if (data) {
        setJenisKB(data);
      }
    };
    fetchBidans();
    fetchJenisKb();
  }, []);

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
            KB
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
                  name="tanggalKB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal KB</FormLabel>
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
                  name="tinggiBadan"
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
                  name="jenisKB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis KB</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = jenisKB.find(
                            (target) => target.id === value,
                          );
                          field.onChange(selected);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Jenis KB" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jenisKB.map((val) => (
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
                  name="tanggalKembaliKB"
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
              <Button type="submit">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
