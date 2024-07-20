import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountType, accountTypeSchema, Authority } from '@/schema/schema';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { updateUser } from '@/data/api/api';

interface UserManagementFormProps {
  data: AccountType;
  onSubmitSuccess?: () => void;
}
export const UserManagementForm = ({
  data,
  onSubmitSuccess,
}: UserManagementFormProps) => {
  const { toast } = useToast();
  const form = useForm<AccountType>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: data,
  });

  const handleSubmit = async (values: AccountType) => {
    const response = await updateUser({
      ...values,
      lastModifiedDate: new Date().toISOString(),
    });

    if (response.status === 200) {
      form.reset();
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      toast({
        title: 'Sukses!',
        description: 'Data berhasil diubah',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Username</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Nama Depan</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Nama Depan" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Nama Belakang</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Nama Belakang" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Email</FormLabel>
              <FormControl className="col-span-3">
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorities"
          render={() => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Role</FormLabel>
              <Select
                onValueChange={(value: Authority) => {
                  form.setValue('authorities', [value]);
                }}
              >
                <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
                  <SelectItem value="ROLE_USER">User</SelectItem>
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
