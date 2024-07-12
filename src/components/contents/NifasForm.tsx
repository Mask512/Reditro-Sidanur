import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getPatientById } from '@/utils/api';
import { PatientBiodata } from './PatientBiodata';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PatientType } from '@/schema/schema';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/nifas', label: 'Pemeriksaan Nifas' },
];

const schema = z.object({
  id: z.string(),
  tanggalPemeriksaan: z.string().date(),
  hariKe: z.string(),
  keluhan: z.string(),
  ttvTekananDarah: z.string(),
  ttvNadi: z.string(),
  ttvSuhu: z.string(),
  ttvRespirasi: z.string(),
  ttvSPO2: z.string(),
  ttvBeratBdan: z.string(),
  ttvTinggiBadan: z.string(),
  diagnosa: z.string(),
  planningAsuhan: z.string(),
  planningObat: z.string(),
  planningTindakan: z.string(),
});

export const NifasForm = () => {
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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: patientId,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  return (
    <>
      <BreadCrumb
        pageName={`${patientData?.nama} (${patientData?.nomorPasien})`}
        parentLinks={parentLinks}
      />

      <div className="grid gap-4 max-w-4xl">
        <PatientBiodata patientData={patientData} />

        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Nifas
          </h4>
          <Separator />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          ></form>
        </Form>
      </div>
    </>
  );
};
