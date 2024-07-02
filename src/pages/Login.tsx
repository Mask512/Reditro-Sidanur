import { useState } from 'react';
import { APP } from '@/data/app';
import { UserLoginForm } from '@/components/UserLoginForm';
import { RegisterForm } from '@/components/RegisterForm';

type LoginProps = {
  background: string;
};

export default function Login({ background }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);

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
            {!isRegister ? (
              <UserLoginForm setIsRegister={setIsRegister} />
            ) : (
              <RegisterForm setIsRegister={setIsRegister} />
            )}
          </div>
        </div>

        <div className="hidden bg-muted lg:block">
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
