import { PatientType, patientSchema } from "@/schema/schema";

export const countPatientsByEducation = (patients: PatientType[]) => {
  // Menghitung jumlah pasien berdasarkan pendidikan
  const educationCounts: Record<string, number> = patients.reduce((acc, patient) => {
      // Validasi menggunakan skema Zod
      const validatedPatient = patientSchema.parse(patient);

      // Mengakses properti pendidikan setelah divalidasi
      const pendidikanName = validatedPatient.pendidikan.nama;

      // Jika belum ada entri untuk pendidikan ini, buat entri baru
      if (!acc[pendidikanName]) {
          acc[pendidikanName] = 0;
      }

      // Tambahkan satu pasien ke kategori pendidikan ini
      acc[pendidikanName]++;

      return acc;
  }, {} as Record<string, number>);

  // Membuat output yang diminta
  const output = Object.keys(educationCounts).map(pendidikan => ({
      pendidikan: pendidikan,
      pasien: educationCounts[pendidikan]
  }));

  return output;
};


export const findMostCommonEducation = (output: { pendidikan: string; pasien: number }[]): string => {
  let mostCommonEducation = '';
  let maxPatients = 0;

  // Iterasi melalui output untuk mencari pendidikan dengan jumlah pasien terbanyak
  output.forEach(item => {
      if (item.pasien > maxPatients) {
          maxPatients = item.pasien;
          mostCommonEducation = item.pendidikan;
      }
  });

  return mostCommonEducation;
};