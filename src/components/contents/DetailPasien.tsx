import { Pasien } from '@/data/api/pasien';
import { PatientType } from '@/schema/schema';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientBiodata } from './PatientBiodata';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { BreadCrumb } from '../BreadCrumb';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/data-pasien', label: 'Data Pasien' },
];

const DetailPasien = () => {
  const [dataPatient, setDataPatient] = useState<PatientType | null>(null);
  const { patientId } = useParams<{ patientId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const data = await Pasien.getPasienById(id);
        if (data) {
          setDataPatient(data);
        }
      } catch (error) {
        toast({
          title: 'Gagal',
          variant: 'destructive',
          description: 'Pasien tidak ditemukan , kembali ke halaman utama',
          action: (
            <ToastAction
              altText="Kembali"
              onClick={() => navigate('/data-pasien')}
            >
              Kembali
            </ToastAction>
          ),
        });
      }
    };
    if (patientId) {
      fetchData(patientId);
    }
  }, [navigate, patientId, toast]);
  return (
    dataPatient && (
      <>
        <BreadCrumb parentLinks={parentLinks} pageName={dataPatient.nama} />
        <div className="max-w-xl mx-auto">
          <PatientBiodata patientData={dataPatient} />
        </div>
      </>
    )
  );
};

export default DetailPasien;
