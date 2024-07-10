import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getPatientById } from '@/utils/api';
import { PatientType } from './Register';
import { PatientBiodata } from './PatientBiodata';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/kehamilan', label: 'Pemeriksaan Kehamilan' },
];

export const KehamilanForm = () => {
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
    </>
  );
};
