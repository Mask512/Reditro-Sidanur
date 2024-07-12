import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../BreadCrumb';
import { useEffect, useState } from 'react';
import { getBidans, getPatientById } from '@/utils/api';
import { PatientBiodata } from './PatientBiodata';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  BidanType,
  PatientType,
  pemeriksaanKehamilanSchema,
  PemeriksaanKehamilanType,
} from '@/schema/schema';
import { Textarea } from '../ui/textarea';
import axios from 'axios';
import { APP } from '@/data/app';
import { useToast } from '../ui/use-toast';

const parentLinks = [
  { href: '/', label: 'Home' },
  { href: '/kehamilan', label: 'Pemeriksaan Kehamilan' },
];

export const KehamilanForm = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientType | null>(null);
  const [bidans, setBidans] = useState<BidanType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBidans = async () => {
      const data = await getBidans();
      if (data) {
        setBidans(data);
      }
    };
    fetchBidans();
  }, []);

  const form = useForm<PemeriksaanKehamilanType>({
    resolver: zodResolver(pemeriksaanKehamilanSchema),
    defaultValues: {
      tanggalPemeriksaan: String(new Date().toISOString().split('T')[0]),
      anamnesa: '',
      ttvTekananDarah: '',
      ttvNadi: '',
      ttvBeratBdan: '',
      ttvRespirasi: '',
      ttvSPO2: '',
      ttvSuhu: '',
      ttvTinggiBadan: '',
      letakBayi: '',
      diagnosa: '',
      pemeriksaanDJJ: '',
      pemeriksaanLILA: '',
      pemeriksaanTFU: '',
      pemeriksaanUsiaKehamilan: '',
      planningAsuhan: '',
      planningObat: '',
      planningTindakan: '',
      riwayatKehamilanGPA1: '',
      riwayatKehamilanGPA2: '',
      riwayatKehamilanGPA3: '',
      riwayatKehamilanHPHT: '',
      riwayatKehamilanTPorHPL: '',
    },
  });
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        const data = await getPatientById(patientId);
        setPatientData(data);
        form.setValue('pasien', data);
      }
    };
    fetchPatient();
  }, [patientId, form]);

  const onSubmit = async (values: PemeriksaanKehamilanType) => {
    console.log(values);
    const response = await axios.post(
      `${APP.API_URL}/pemeriksaan-nifas`,
      values,
    );

    if (response.status === 201) {
      toast({
        description: 'Sukses. Data telah tersimpan!',
      });
    }
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

      <div className="grid gap-4 max-w-4xl">
        <PatientBiodata patientData={patientData} />
        <div>
          <h4 className="text-2xl font-semibold tracking-tight">
            Pemeriksaan Kehamilan
          </h4>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tanggalPemeriksaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pemeriksaan</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bidan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidan</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selected = bidans.find(
                          (target) => target.id === value,
                        );
                        field.onChange(selected);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bidan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bidans.map((val) => (
                          <SelectItem key={val.id} value={val.id}>
                            {val.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="anamnesa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anamnesa</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Subject"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h4 className="underline underline-offset-4 font-semibold text-lg">
              Tanda Tanda Vital
            </h4>
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
            <h4 className="underline underline-offset-4 font-semibold text-lg">
              Riwayat Kehamilan
            </h4>
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
            <h4 className="underline underline-offset-4 font-semibold text-lg">
              Pemeriksaan
            </h4>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="pemeriksaanUsiaKehamilan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usia Kehamilan</FormLabel>
                    <FormControl>
                      <Input placeholder="Minggu" {...field} />
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
                      <Input placeholder="x/mnt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="letakBayi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letak Bayi</FormLabel>
                    <FormControl>
                      <Input placeholder="Letak bayi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosa</FormLabel>
                    <FormControl>
                      <Input placeholder="Diagnosa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h4 className="underline underline-offset-4 font-semibold text-lg">
              Planning
            </h4>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
