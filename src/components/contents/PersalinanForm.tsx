import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getPatientById } from '@/utils/api';
import { PatientBiodata } from './PatientBiodata';
import { PatientType } from '@/schema/schema';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/persalinan', label: 'Persalinan' },
];

export const PersalinanForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await getPatientById(patientId);
        setPatientData(data);
      }
    };
    fetchPatient();
  }, [patientId]);

  return (
    <>
      <BreadCrumb
        pageName={`${patientData?.nama} (${patientData?.nomorPasien})`}
        parentLinks={parentLinks}
      />
      <PatientBiodata patientData={patientData} />
      {/* Form Pemeriksaan Kehamilan */}

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Persalinan</h4>
      
    </>
  );
};
