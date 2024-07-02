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
import React from 'react';
import axios from 'axios';
import { APP } from '@/data/app';
import { setAuthenticateHeader } from '@/utils/authenticate';
import { useDispatch } from 'react-redux';
import { login } from '@/store/store';

const schema = z.object({
  username: z.string(),
  password: z.string(),
  remember: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

type LoginFormProps = {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserLoginForm = ({setIsRegister}: LoginFormProps) => {
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
                      placeholder="username"
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
                      type='password'
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
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          <Button type="submit" className="w-full" variant="default">
            {form.formState.isSubmitting ? 'Loading ...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account? <Button onClick={()=>setIsRegister(true)} variant="link">Sign up</Button>
        </div>
      </Form>
    </>
  );
};
