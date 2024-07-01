// import { useState } from 'react';
import { APP } from '@/data/app';
// import { AdminLoginForm } from '@/components/AdminLoginForm';
import { UserLoginForm } from '@/components/UserLoginForm';

type LoginProps = {
  background: string;
};

export default function Login({ background }: LoginProps) {
  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 min min-h-screen">
          <div className="mx-auto grid w-[350px] gap-6 ">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-6">
                {APP.NAME}
              </h1>
            </div>
            <UserLoginForm />
            
          </div>
        </div>

        <div className="hidden bg-muted lg:block">
          {/* Image */}
          <img
            src={background}
            alt="background image"
            width="1920"
            height={1080}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}
