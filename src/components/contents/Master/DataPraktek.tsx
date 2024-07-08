import { BreadCrumb } from '@/components/BreadCrumb';
import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';
import { dataPraktekColumns } from './dataPraktekColumns';
import { DataPraktekType, getDataPraktek, updateDataPraktek } from '@/utils/api';

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const DataPraktek = () => {
  const [dataLokasi, setDataLokasi] = useState<DataPraktekType[]>([]);

  const fetchData = async () => {
    const data = await getDataPraktek();
    setDataLokasi(data);
  };

  useEffect(() => {
    fetchData();
  }, [setDataLokasi]);

  const handleEdit = async (id:string, newData: DataPraktekType ) => {
    await updateDataPraktek(id, newData);
    fetchData();
  };

  return (
    <>
      <BreadCrumb pageName='Data Praktek' parentLinks={parentLinks}/>
      <h1 className="text-xl font-semibold">Data Praktek</h1>
      <DataTable
          columns={dataPraktekColumns(handleEdit)}
          data={dataLokasi}
        />
    </>
  )
}
