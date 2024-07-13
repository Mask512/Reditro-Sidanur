import { DataTable } from '@/components/ui/data-table';
import { patientColumns } from './patientColumns';
import { useEffect, useState } from 'react';
import { PatientType } from '@/schema/schema';
import { Pasien } from '@/data/api/pasien';

type PatientTableProps = {
  action: (id: string)=> string
}

export const PatientTable = ({action}: PatientTableProps) => {
  const [patient, setPatient] = useState<PatientType[]>([]);
  useEffect(() => {
    const fetchPatient = async () => {
      const data = await Pasien.getPasiens();
      setPatient(data);
    };

    fetchPatient();
  }, [setPatient]);

  return (
    <>
      <DataTable columns={patientColumns(action)} data={patient} filterColumns={{
        key: 'nama',
        placeholder: 'Cari Nama ...'
      }} />
    </>
  );
};
