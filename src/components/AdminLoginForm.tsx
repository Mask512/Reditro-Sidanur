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
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
// import { LoginFormProps } from './UserLoginForm';
import { APP } from '@/data/app';
import { setAuthenticateHeader } from '@/utils/authenticate';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { adminLogin, login } from '@/store/store';

const schema = z.object({
  username: z.string(),
  password: z.string().min(5),
  remember: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      remember: false,
    },
  });

  const handleLogin: SubmitHandler<FormFields> = async (values) => {
    try {
      const { data } = await axios.post(`${APP.API_URL}/authenticate`, values);
      if (data) {
        const token = data.id_token;
        setAuthenticateHeader(token);
        values.remember
          ? localStorage.setItem('token', token)
          : sessionStorage.setItem('token', token);
          dispatch(login());
          dispatch(adminLogin());
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'Data Not found',
        });
      }
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'Login Failed',
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(handleLogin)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Administrator ID"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-2">
                  <FormControl>
                    <Checkbox
                      onCheckedChange={() => field.onChange(!field.value)}
                    />
                  </FormControl>
                  <FormLabel>Remember me ?</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" variant="destructive">
            {form.formState.isSubmitting ? 'Loading ...' : 'Login'}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        <h3>Login as User ?</h3>
        <br />
        <Button
          variant="secondary"
          className="w-full"
        >
          User login
        </Button>
      </div>
    </>
  );
};
