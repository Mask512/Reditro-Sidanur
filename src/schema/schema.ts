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

export const patientSchema = z.object({
  id: z.string(),
  nomorPasien: z.string().min(1, 'Required'),
  nik: z.string().min(1, 'Required'),
  nama: z.string().min(1, 'Required'),
  tempatLahir: z.string().min(1, 'Required'),
  tanggalLahir: z.string().date(),
  alamat: z.string().min(1, 'Required'),
  jenisKelamin: z.enum(['PRIA', 'WANITA']),
  noTelp: z.string().min(1, 'Required'),
  noTelpDarurat: z.string(),
  golonganDarah: z.optional(golonganDarahScheme),
  pendidikan: z.optional(pendidikanScheme),
  pekerjaan: z.optional(pekerjaanScheme),
  namaPenanggungJawab: z.string(),
  hubunganPenanggungJawab: z.optional(hubunganScheme),
});

export type PatientType = z.infer<typeof patientSchema>;

export const jenisKBSchema = z.object({
  id: z.string(),
  nama: z.string(),
});

export type JenisKBType = z.infer<typeof jenisKBSchema>;

export const lokasiPraktekSchema = z.object({
  id: z.string(),
  nama: z.string(),
  alamat: z.string(),
});
export type UserType = z.infer<typeof userSchema>;

export const userSchema = z.object({
  id: z.string(),
  login: z.string(),
});

export type LokasiPraktekType = z.infer<typeof userSchema>;

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

export type BidanType = z.infer<typeof bidanSchema>;

export const pemeriksaanKBSchema = z.object({
  bidan: bidanSchema,
  jenisKB: jenisKBSchema,
  pasien: patientSchema,
  tanggalKB: z.string().date(),
  beratBadan: z.string(),
  tinggiBadan: z.string(),
  tanggalKembaliKB: z.string().date(),
});

export type authority = 'ROLE_USER' | 'ROLE_ADMIN';

export type AccountType = {
  id?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
  password?: string;
  authorities: authority[];
};