import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SquareArrowLeft } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { APP } from '@/data/app';

const Activate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const key = searchParams.get('key');
    if (!key) {
      navigate('/');
      return;
    }

    const checkActivation = async () => {
      try {
        const response = await axios.get(`${APP.API_URL}/activate?key=${key}`);
        if (response.status === 200) {
          setIsSuccess(true);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.request?.status);
      }
    };

    checkActivation();
  }, [navigate, searchParams]);

  return (
    <div className="grid place-items-center justify-center w-full pt-28">
      <Card className='min-w-96'>
        <CardHeader>
          <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {isSuccess ? 'Aktivasi berhasil!' : 'Oops, Aktivasi gagal!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess
            ? 'Silahkan kembali ke halaman utama!'
            : 'Periksa kembali kode aktivasi atau hubungi administrator'}
        </CardContent>
        <CardFooter>
          <Link to="/" className="ml-auto">
            <Button>
              <SquareArrowLeft className="h-4 w-4 mr-4" />
              Kembali
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Activate;