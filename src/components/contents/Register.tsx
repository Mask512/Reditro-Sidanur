import { useForm } from 'react-hook-form';
import { BreadCrumb } from '../BreadCrumb';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  // FormDescription,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
// import { getLastRMNum } from '@/utils/getRMNumber';
import {
  addPatient,
  getGolonganDarahs,
  getHubungans,
  getPekerjaans,
  getPendidikans,
  // getTotalPatients,
} from '@/utils/api';
import { toast } from '@/components/ui/use-toast';

import { BloodTypes } from './Master/GolonganDarah';
import { PendidikanType } from './Master/Pendidikan';
import { PekerjaanType } from './Master/Pekerjaan';
import { HubunganType } from './Master/Hubungan';

const parentLinks = [{ href: '/', label: 'Home' }];

const pendidikanScheme = z.object({
  id: z.string(),
  nama: z.string(),
  pasiens: z.null(),
});

const pekerjaanScheme = z.object({
  id: z.string(),
  nama: z.string(),
  pasiens: z.null(),
});

const golonganDarahScheme = z.object({
  id: z.string(),
  nama: z.string(),
  pasiens: z.null(),
  persalinans: z.null(),
});

const hubunganScheme = z.object({
  id: z.string(),
  nama: z.string(),
  pasiens: z.null(),
});

const formSchema = z.object({
  // id: z.string().min(1, 'Required'),
  nik: z.string().min(1, 'Required'),
  nama: z.string().min(1, 'Required'),
  tempatLahir: z.string().min(1, 'Required'),
  tanggalLahir: z.string().date(),
  jenisKelamin: z.enum(['PRIA', 'WANITA']),
  noTelp: z.string().min(1, 'Required'),
  noTelpDarurat: z.string(),
  golonganDarah: z.optional(golonganDarahScheme),
  pendidikan: z.optional(pendidikanScheme),
  pekerjaan: z.optional(pekerjaanScheme),
  namaPenanggungJawab: z.string(),
  hubunganPenanggungJawab: z.optional(hubunganScheme),
});

export type PatientType = z.infer<typeof formSchema>;

export const Register = () => {  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: '',
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      noTelp: '',
      noTelpDarurat: '',
      namaPenanggungJawab: '',
      jenisKelamin: 'WANITA'
    },
  });

  // const [lastRMNumber, setLastRMNumber] = useState('');
  const [golonganDarah, setGolonganDarah] = useState<BloodTypes[]>([]);
  const [pendidikan, setPendidikan] = useState<PendidikanType[]>([]);
  const [pekerjaan, setPekerjaan] = useState<PekerjaanType[]>([]);
  const [hubungan, setHubungan] = useState<HubunganType[]>([]);

  // useEffect(() => {
  //   const lastRM = async () => {
  //     const data = await getTotalPatients();
  //     if (data) {
  //       const rmNumber = getLastRMNum(data);
  //       setLastRMNumber(rmNumber);
  //       form.setValue('id', rmNumber);
  //     }
  //   };
  //   lastRM();
  // }, [form]);

  useEffect(() => {
    const fetchGolDarah = async () => {
      const data = await getGolonganDarahs();
      if (data) {
        setGolonganDarah(data);
      }
    };

    fetchGolDarah();
  }, []);

  useEffect(() => {
    const fetchPendidikan = async () => {
      const data = await getPendidikans();
      if (data) {
        setPendidikan(data);
      }
    };

    fetchPendidikan();
  }, []);

  useEffect(() => {
    const fetchPekerjaan = async () => {
      const data = await getPekerjaans();
      if (data) {
        setPekerjaan(data);
      }
    };

    fetchPekerjaan();
  }, []);

  useEffect(() => {
    const fetchHubungan = async () => {
      const data = await getHubungans();
      if (data) {
        setHubungan(data);
      }
    };

    fetchHubungan();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await addPatient(values);

    if (response.status === 201) {
      form.reset();

      toast({
        title: 'Sukses!',
        description: 'Pasien berhasil ditambahkan',
      });

    }
  };

  return (
    <>
      <BreadCrumb pageName="Registration" parentLinks={parentLinks} />
      {/* Registration form */}

      <h3 className="text-2xl font-bold">Pendaftaran Pasien Baru</h3>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-4xl"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NO RM</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nomor RM"
                      {...field}
                      value={lastRMNumber}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK KTP</FormLabel>
                  <FormControl>
                    <Input placeholder="NIK KTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAMA LENGKAP</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="Tempat Lahir" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="tanggalLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="noTelp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PRIA">PRIA</SelectItem>
                        <SelectItem value="WANITA">WANITA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="golonganDarah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Golongan Darah</FormLabel>
                    <Select
                      defaultValue={field.value?.id}
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
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="pendidikan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pendidikan</FormLabel>
                    <Select
                      defaultValue={field.value?.id}
                      onValueChange={(value) => {
                        const selected = pendidikan.find(
                          (target) => target.id === value,
                        );
                        field.onChange(selected);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pendidikan Darah" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pendidikan.map((val) => (
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
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="pekerjaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pekerjaan</FormLabel>
                    <Select
                      defaultValue={field.value?.id}
                      onValueChange={(value) => {
                        const selected = pekerjaan.find(
                          (target) => target.id === value,
                        );
                        field.onChange(selected);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pekerjaan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pekerjaan.map((val) => (
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
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="namaPenanggungJawab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penanggung Jawab</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Penanggung Jawab" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="noTelpDarurat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon Penanggung Jawab</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="hubunganPenanggungJawab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hubungan Penanggung Jawab</FormLabel>
                    <Select
                      defaultValue={field.value?.id}
                      onValueChange={(value) => {
                        const selected = hubungan.find(
                          (target) => target.id === value,
                        );
                        field.onChange(selected);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Hubungan " />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hubungan.map((val) => (
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
            </div>
          </div>

          <Button type="submit">Simpan</Button>
        </form>
      </Form>
    </>
  );
};
