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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { PatientType } from '@/schema/schema';


const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/kehamilan', label: 'Pemeriksaan Kehamilan' },
];

const schema = z.object({
  id: z.string(),
  tanggalPemeriksaan: z.string().date(),
  anamnesa: z.string(),
  ttvTekananDarah: z.string(),
  ttvNadi: z.string(),
  ttvSuhu: z.string(),
  ttvRespirasi: z.string(),
  ttvSPO2: z.string(),
  ttvBeratBdan: z.string(),
  ttvTinggiBadan: z.string(),
  riwayatKehamilanGPA1: z.string(),
  riwayatKehamilanGPA2: z.string(),
  riwayatKehamilanGPA3: z.string(),
  riwayatKehamilanHPHT: z.string().date(),
  riwayatKehamilanTPorHPL: z.string().date(),
  pemeriksaanUsiaKehamilan: z.string(),
  pemeriksaanTFU: z.string(),
  pemeriksaanLILA: z.string(),
  pemeriksaanDJJ: z.string(),
  diagnosa: z.string(),
  planningAsuhan: z.string(),
  planningObat: z.string(),
  planningTindakan: z.string(),
});

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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      anamnesa: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  const handleCalculate = () => {
    const hpht = form.getValues('riwayatKehamilanHPHT');
    if (hpht) {
      const hphtDate = new Date(hpht);
      const eddDate = new Date(hphtDate.getTime() + 280 * 24 * 60 * 60 * 1000); // Calculate EDD (HPHT + 280 days)
      form.setValue(
        'riwayatKehamilanTPorHPL',
        eddDate.toISOString().split('T')[0],
      );
    }
  };

  return (
    <>
      <BreadCrumb
        pageName={`${patientData?.nama} (${patientData?.nomorPasien})`}
        parentLinks={parentLinks}
      />
      <PatientBiodata patientData={patientData} />
      {/* Form Pemeriksaan Kehamilan */}

      <h4 className="text-2xl font-semibold tracking-tight">
        Pemeriksaan Kehamilan
      </h4>
      <Separator />
      {/* Form */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="anamnesa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anamnesa</FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="ttvTekananDarah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TD</FormLabel>
                  <FormControl>
                    <Input placeholder="mmHg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvNadi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nadi</FormLabel>
                  <FormControl>
                    <Input placeholder="bpm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvSuhu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suhu</FormLabel>
                  <FormControl>
                    <Input placeholder="celcius" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvRespirasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Respirasi</FormLabel>
                  <FormControl>
                    <Input placeholder="x/mnt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvSPO2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SPO2</FormLabel>
                  <FormControl>
                    <Input placeholder="%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvBeratBdan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat Badan</FormLabel>
                  <FormControl>
                    <Input placeholder="kg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttvTinggiBadan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi Badan</FormLabel>
                  <FormControl>
                    <Input placeholder="cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <FormField
              control={form.control}
              name="riwayatKehamilanGPA1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gravida</FormLabel>
                  <FormControl>
                    <Input placeholder="G" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riwayatKehamilanGPA2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paritas</FormLabel>
                  <FormControl>
                    <Input placeholder="P" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="riwayatKehamilanGPA3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abortus</FormLabel>
                  <FormControl>
                    <Input placeholder="A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="riwayatKehamilanHPHT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HPHT</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="riwayatKehamilanTPorHPL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HPL</FormLabel>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Calculator
                            className="h-4 w-4 float-end cursor-pointer"
                            onClick={handleCalculate}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Hitung Otomatis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="pemeriksaanUsiaKehamilan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usia Kehamilan</FormLabel>
                  <FormControl>
                    <Input placeholder="mg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pemeriksaanTFU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TFU</FormLabel>
                  <FormControl>
                    <Input placeholder="cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pemeriksaanLILA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LILA</FormLabel>
                  <FormControl>
                    <Input placeholder="cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pemeriksaanDJJ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DJJ</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="diagnosa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosa</FormLabel>
                  <FormControl>
                    <Input placeholder="diagnosa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planningAsuhan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asuhan</FormLabel>
                  <FormControl>
                    <Input placeholder="Asuhan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="planningObat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Obat</FormLabel>
                  <FormControl>
                    <Input placeholder="Obat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planningTindakan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tindakan</FormLabel>
                  <FormControl>
                    <Input placeholder="Tindakan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
