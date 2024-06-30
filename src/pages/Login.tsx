import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { app } from '@/data/app';

type LoginProps = {
  handleLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  background: string;
};

export default function Login({ handleLogin, background, setAdmin }: LoginProps) {
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleAdminLogin = () => {
    handleLogin(true)
    setAdmin(true)
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 min min-h-screen">
          {isAdminLogin ? (
            <div className="mx-auto grid w-[350px] gap-6 ">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-6">
                  {app.name}
                </h1>
                {/* <h1 className="text-2xl font-bold">Login</h1> */}
                {/* <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p> */}
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Administrator ID</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => handleAdminLogin()}
                  variant='destructive'
                >
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <h3>Login as User ?</h3>
                <br />
                <Button
                  variant="secondary"
                  onClick={() => setIsAdminLogin(false)}
                  className="w-full"
                >
                  User login
                </Button>
              </div>
            </div>
          ) : (
            <div className="mx-auto grid w-[350px] gap-6 ">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-6">
                  {app.name}
                </h1>
                {/* <h1 className="text-2xl font-bold">Login</h1> */}
                {/* <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p> */}
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => handleLogin(true)}
                >
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <h3>Login as Admin ?</h3>
                <br />
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setIsAdminLogin(true)}
                >
                  Administrator login
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden bg-muted lg:block">
          {/* Image */}
          <img
            src={background}
            alt="crypto"
            width="1920"
            height={1080}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
