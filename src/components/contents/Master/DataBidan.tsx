import { BreadCrumb } from '@/components/BreadCrumb';
import { dataBidanColumns } from './dataBidanColumns';
import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APP } from '@/data/app';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DataBidanForm } from '@/components/DataBidanForm';
import { getBidans } from '@/utils/api';
import { BidanType } from '@/schema/schema';


const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const DataBidan = () => {
  const { toast } = useToast();
  const [dataBidan, setDataBidan] = useState<BidanType[]>([]);

  const fetchData = async () => {
    const data = await getBidans();
    if (data) {
      setDataBidan(data);
    }
  };

  const deleteBidan = async (id: string) => {
    try {
      const response = await axios.delete(`${APP.API_URL}/bidans/${id}`);

      if (response.status === 204) {
        toast({
          description: `Bidan id : ${id} berhasil dihapus`,
        });
        fetchData();
      }
    } catch (error) {
      let errorMessage = 'Gagal dihapus';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        description: errorMessage,
      });
    }
  };

  const handleSubmitSuccess = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [setDataBidan]);

  return (
    <>
      <BreadCrumb pageName="Data Bidan" parentLinks={parentLinks} />
      <h1 className="text-xl font-semibold">Data Bidan</h1>
      <div className="grid gap-4 grid-cols-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="max-w-28 mr-auto">Tambah Data</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle>Data Bidan</DialogTitle>
              <DialogDescription>
                Isi data bidan dengan lengkap.
              </DialogDescription>
            </DialogHeader>
            <DataBidanForm onSubmitSuccess={handleSubmitSuccess} />
          </DialogContent>
        </Dialog>
        <DataTable columns={dataBidanColumns(deleteBidan)} data={dataBidan} />
      </div>
    </>
  );
};
