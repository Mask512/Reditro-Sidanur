import { z } from 'zod';

export const pendidikanScheme = z.object({
  id: z.string(),
  nama: z.string(),
});

export const pekerjaanScheme = z.object({
  id: z.string(),
  nama: z.string(),
});

export const golonganDarahScheme = z.object({
  id: z.string(),
  nama: z.string(),
});

export const hubunganScheme = z.object({
  id: z.string(),
  nama: z.string(),
});

export const jenisImunisasiScheme = z.object({
  id: z.string(),
  nama: z.string(),
});

export const authoritySchema = z.union([
  z.literal('ROLE_USER'),
  z.literal('ROLE_ADMIN'),
]);

export const accountTypeSchema = z.object({
  id: z.string().optional(),
  login: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  activated: z.boolean().optional(),
  langKey: z.string().optional(),
  createdBy: z.string().optional(),
  createdDate: z.date().optional().nullable(),
  lastModifiedBy: z.string().optional(),
  lastModifiedDate: z.date().optional().nullable(),
  password: z.string().optional(),
  authorities: z.array(authoritySchema),
});

export const patientSchema = z.object({
  id: z.string().optional(),
  nomorPasien: z.string().min(1, 'Required'),
  nik: z.string().min(1, 'Required'),
  nama: z.string().min(1, 'Required'),
  tempatLahir: z.string().min(1, 'Required'),
  tanggalLahir: z.string().date(),
  alamat: z.string().min(1, 'Required'),
  jenisKelamin: z.enum(['PRIA', 'WANITA']),
  noTelp: z.string().min(1, 'Required'),
  noTelpDarurat: z.string().optional(),
  golonganDarah: z.optional(golonganDarahScheme),
  pendidikan: z.optional(pendidikanScheme),
  pekerjaan: z.optional(pekerjaanScheme),
  namaPenanggungJawab: z.string(),
  hubunganPenanggungJawab: z.optional(hubunganScheme),
});

export const jenisKBSchema = z.object({
  id: z.string(),
  nama: z.string(),
});

export const lokasiPraktekSchema = z.object({
  id: z.string(),
  nama: z.string(),
  alamat: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  login: z.string(),
});

export const bidanSchema = z.object({
  id: z.string(),
  nama: z.string(),
  alamat: z.string(),
  noHp: z.string(),
  noSTR: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.string().date(),
  jenisKelamin: z.enum(['PRIA', 'WANITA']),
  jabatan: z.string(),
  lokasiPraktek: lokasiPraktekSchema,
  user: z.optional(userSchema).nullable(),
  pemeriksaanKehamilans: z.string().nullable(),
  keluargaBerencanas: z.string().nullable(),
  imunisasis: z.string().nullable(),
  persalinans: z.string().nullable(),
  pemeriksaanNifas: z.string().nullable(),
});

export const pemeriksaanKBSchema = z.object({
  id: z.string().optional(),
  bidan: bidanSchema,
  jenisKB: jenisKBSchema,
  pasien: patientSchema,
  tanggalKB: z.string().date(),
  beratBadan: z.string(),
  tinggiBadan: z.string(),
  tanggalKembaliKB: z.string().date(),
  riwayatRekamMedis: z.string().nullable().optional(),
});

export const pemeriksaanImunisasiSchema = z.object({
  id: z.string().optional(),
  bidan: bidanSchema,
  jenisImunisasi: jenisImunisasiScheme,
  pasien: patientSchema,
  beratBadan: z.string(),
  panjangBadan: z.string(),
  tanggalImunisasi: z.string().date(),
  tanggalKembaliImunisasi: z.string().date(),
});

export const pemeriksaanNifasSchema = z.object({
  tanggalPemeriksaan: z.string().date(),
  hariKe: z.string().min(1, 'Required'),
  keluhan: z.string().min(1, 'Required'),
  ttvTekananDarah: z.string().min(1, 'Required'),
  ttvNadi: z.string().min(1, 'Required'),
  ttvSuhu: z.string().min(1, 'Required'),
  ttvRespirasi: z.string().min(1, 'Required'),
  ttvSPO2: z.string().min(1, 'Required'),
  ttvBeratBdan: z.string().min(1, 'Required'),
  ttvTinggiBadan: z.string().min(1, 'Required'),
  diagnosa: z.string().min(1, 'Required'),
  planningAsuhan: z.string().min(1, 'Required'),
  planningObat: z.string().min(1, 'Required'),
  planningTindakan: z.string().min(1, 'Required'),
  id: z.string().optional(),
  bidan: bidanSchema,
  pasien: patientSchema,
});

export type Authority = z.infer<typeof authoritySchema>;
export type AccountType = z.infer<typeof accountTypeSchema>;
export type PatientType = z.infer<typeof patientSchema>;
export type JenisKBType = z.infer<typeof jenisKBSchema>;
export type UserType = z.infer<typeof userSchema>;
export type LokasiPraktekType = z.infer<typeof lokasiPraktekSchema>;
export type BidanType = z.infer<typeof bidanSchema>;
export type PemeriksaanKBType = z.infer<typeof pemeriksaanKBSchema>;
export type PemeriksaanImunisasiType = z.infer<typeof pemeriksaanImunisasiSchema>;
export type PemeriksaanNifasType = z.infer<typeof pemeriksaanNifasSchema>;