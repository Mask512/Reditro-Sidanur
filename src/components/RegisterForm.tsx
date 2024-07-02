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
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { APP } from '@/data/app';

type RegisterFormProps = {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormFields = z.infer<typeof schema>;

const generateDefaultValues = () => {
  const now = new Date().toISOString();
  return {
    id: +new Date(),
    login: '',
    firstName: '',
    lastName: '',
    imageUrl: '',
    activated: true,
    langKey: 'en',
    createdBy: 'system',
    createdDate: now,
    lastModifiedBy: 'system',
    lastModifiedDate: now,
    authorities: ['ROLE_USER'],
  };
};

export const RegisterForm = ({ setIsRegister }: RegisterFormProps) => {
  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '@gmail.com',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit: SubmitHandler<FormFields> = async (values) => {
    const defaultValues = generateDefaultValues();
    const data = {
      ...defaultValues,
      login: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(`${APP.API_URL}/register`, data)
      if (response.status === 201) {
        toast({description: 'Registration successful'});
        form.reset();
      }
      
    } catch (error) {
      toast({description: 'Registration failed'});
      console.error(error);      
    }
    console.log(data);
  };

  return (
    <>
      <h3 className="font-semibold text-center">Registration a new User</h3>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          <Button type="submit" className="w-full" variant="default">
            {form.formState.isSubmitting ? 'Loading ...' : 'Register'}
          </Button>
        </form>
      </Form>
      <Button onClick={() => setIsRegister(false)} variant="link" className='ml-auto'>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
      </Button>
      <Toaster/>
    </>
  );
};
