import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { Pasien } from '@/data/api/pasien';
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
import { GolonganDarahType, patientSchema, PatientType } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PendidikanType } from './Master/Pendidikan';
import { PekerjaanType } from './Master/Pekerjaan';
import { HubunganType } from './Master/Hubungan';
import {
  getGolonganDarahs,
  getHubungans,
  getPekerjaans,
  getPendidikans,
} from '@/data/api/api';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useToast } from '../ui/use-toast';
import { AxiosError } from 'axios';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/data-pasien', label: 'Data Pasien' },
];

const UpdatePasien = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [golonganDarah, setGolonganDarah] = useState<GolonganDarahType[]>([]);
  const [pendidikan, setPendidikan] = useState<PendidikanType[]>([]);
  const [pekerjaan, setPekerjaan] = useState<PekerjaanType[]>([]);
  const [hubungan, setHubungan] = useState<HubunganType[]>([]);

  useEffect(() => {
    const fetchGolDarah = async () => {
      const data = await getGolonganDarahs();
      if (data) {
        setGolonganDarah(data);
      }
    };
    const fetchPendidikan = async () => {
      const data = await getPendidikans();
      if (data) {
        setPendidikan(data);
      }
    };

    const fetchPekerjaan = async () => {
      const data = await getPekerjaans();
      if (data) {
        setPekerjaan(data);
      }
    };

    const fetchHubungan = async () => {
      const data = await getHubungans();
      if (data) {
        setHubungan(data);
      }
    };
    fetchGolDarah();
    fetchPendidikan();
    fetchPekerjaan();
    fetchHubungan();
  }, []);

  const form = useForm<PatientType>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      alamat: '',
      id: '',
      jenisKelamin: 'WANITA',
      nama: '',
      namaPenanggungJawab: '',
      nik: '',
      nomorPasien: '',
      noTelp: '',
      noTelpDarurat: '',
      tanggalLahir: '',
      tempatLahir: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Pasien.getPasienById(patientId!);
        form.reset(data);
      } catch (error) {
        console.log(error);
        navigate('/data-pasien');
      }
    };

    fetchData();
  }, [patientId, navigate, form]);

  const onSubmit = async (values: PatientType) => {
    try {
      const response = await Pasien.updatePasien(patientId!, values);
      if (response.status === 200) {
        form.reset();

        toast({
          title: 'Sukses!',
          description: 'Pasien berhasil disimpan',
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err && err.request?.status) {
        toast({
          title: 'Gagal',
          variant: 'destructive',
          description:
            'Pasien gagal ditambahkan, NIK Sudah terdaftar / Data salah',
        });
      }
    }
  };

  return (
    <div>
      <BreadCrumb pageName="Edit Pasien" parentLinks={parentLinks} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-4xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nomorPasien"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NO RM</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor RM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Alamat lengkap"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                          <SelectValue placeholder="Pendidikan Terakhir" />
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

          <Separator />
          <h3 className="font-semibold underline underline-offset-2">
            Penanggung Jawab / Hubungan
          </h3>

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
                name="hubunganPenanggungJawab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hubungan</FormLabel>
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
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="noTelpDarurat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => form.reset()}
              variant="destructive"
              className="w-full"
            >
              Reset
            </Button>
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasien;
