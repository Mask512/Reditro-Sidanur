import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
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
import { toast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DialogFooter } from './ui/dialog';
import axios from 'axios';
import { APP } from '@/data/app';
import { useEffect, useState } from 'react';
import {
  bidanSchema,
  BidanType,
  LokasiPraktekType,
  UserType,
} from '@/schema/schema';

interface DataBidanFormProps {
  onSubmitSuccess?: () => void;
}

export const DataBidanForm: React.FC<DataBidanFormProps> = ({
  onSubmitSuccess,
}) => {
  const [locations, setLocations] = useState<LokasiPraktekType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`${APP.API_URL}/lokasi-prakteks`);
      if (response.data) {
        setLocations(response.data);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${APP.API_URL}/users`);
      if (response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<BidanType>({
    resolver: zodResolver(bidanSchema),
    defaultValues: {
      id: '',
      alamat: '',
      jabatan: '',
      nama: '',
      noHp: '',
      noSTR: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: 'WANITA',
    },
  });

  const handleSubmit = async (values: BidanType) => {
    const response = await axios.post(`${APP.API_URL}/bidans`, values);

    if (response.status === 201) {
      form.reset();

      toast({
        title: 'Sukses!',
        description: 'Bidan berhasil ditambahkan',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Nama</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Nama" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Alamat</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Alamat" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noHp"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Nomor Telepon</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Nomor Telepon" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noSTR"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">No. STR</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="No. STR" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tempatLahir"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Tempat Lahir</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Tempat Lahir" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tanggalLahir"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Tanggal Lahir</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lokasiPraktek"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Lokasi Praktek</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selectedLocation = locations.find(
                    (loc) => loc.id === value,
                  );
                  field.onChange(selectedLocation);
                }}
                defaultValue={field.value?.id}
              >
                <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Lokasi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">User Account</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selectedUser = users.find(
                    (user) => user.login === value,
                  );
                  field.onChange(selectedUser);
                }}
                defaultValue={field.value?.login}
              >
                <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.login}>
                      {user.login}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="w-full">
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
