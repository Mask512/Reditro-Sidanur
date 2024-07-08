import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { dataPraktekColumns } from './dataPraktekColumns';

export type DataPraktekType = {
  id: string;
  nama: string;
  alamat: string;
  bidan: string | null;
};

const endpoint = 'lokasi-prakteks';

export const DataPraktek = () => {
  const [dataLokasi, setDataLokasi] = useState<DataPraktekType[]>([]);

  const fetchData = async () => {
    const { data } = await axios.get(`${APP.API_URL}/${endpoint}`);
    if (data) {
      setDataLokasi(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDataLokasi]);

  const handleEdit = async (id:string, newData: DataPraktekType ) => {
    await axios.put(`${APP.API_URL}/${endpoint}/${id}`, newData);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName='Data Praktek'/>
      <h1 className="text-xl font-semibold">Data Praktek</h1>
      <DataTable
          columns={dataPraktekColumns(handleEdit)}
          data={dataLokasi}
        />
    </>
  )
}
