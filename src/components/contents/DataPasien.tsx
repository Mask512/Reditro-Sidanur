import { Route, Routes, useNavigate } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { PatientTable } from '../PatientTable';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pasien } from '@/data/api/pasien';
import { useToast } from '../ui/use-toast';
import { AxiosError } from 'axios';
import { useState } from 'react';

const parentLinks = [{ href: '/', label: 'Home' }];

export const DataPasien = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reloadData, setReloadData] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await Pasien.deletePasien(id);
      if (response.status === 204) {
        toast({
          title: 'Berhasil',
          description: 'Pasien berhasil dihapus.',
        });
        setReloadData(!reloadData);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err && err.request?.status) {
        toast({
          title: 'Gagal',
          variant: 'destructive',
          description: 'Pasien gagal dihapus, ada data yang masih digunakan.',
        });
      }
    }
  };

  const handleAction = (id: string) => {
    return (
      <div className="flex gap-1">
        <Button onClick={() => navigate(`/data-pasien/${id}`)}>Lihat</Button>
        <Button
          onClick={() => navigate(`/data-pasien/${id}/edit`)}
          variant="secondary"
        >
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Hapus</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus?</AlertDialogTitle>
              <AlertDialogDescription>
                Data pasien akan terhapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batalkan</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={() => handleDelete(id)} variant="destructive">
                  Hapus
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BreadCrumb pageName="Data Pasien" parentLinks={parentLinks} />
              <PatientTable key={reloadData ? 'reload' : 'no-reload'} action={handleAction} />
            </>
          }
        />
      </Routes>
    </>
  );
};
