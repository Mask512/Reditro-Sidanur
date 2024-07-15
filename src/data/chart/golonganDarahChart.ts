import { PatientType } from '@/schema/schema';

interface BloodTypeData {
  label: string;
}

export const generateBloodTypeData = (patients: PatientType[]) => {
  const bloodTypeMap: Record<string, BloodTypeData> = {};

  patients.forEach((patient) => {
    const golonganDarah = patient.golonganDarah.nama;
    if (!bloodTypeMap[golonganDarah]) {
      bloodTypeMap[golonganDarah] = {
        label: golonganDarah,
      };
    }
  });

  // Convert bloodTypeMap to an array of values
  const bloodTypeArray = Object.values(bloodTypeMap);

  // Create an initial config object with keys for each blood type
  const initialConfig: Record<string, BloodTypeData> = {};
  bloodTypeArray.forEach((bloodType) => {
    initialConfig[bloodType.label] = {
      label: bloodType.label,
    };
  });

  return initialConfig;
};

interface BloodTypeStat {
  golonganDarah: string;
  pasien: number;
}

export const generateBloodTypeStatistics = (
  patients: PatientType[],
): BloodTypeStat[] => {
  const bloodTypeStats: Record<string, BloodTypeStat> = {};

  patients.forEach((patient) => {
    const golonganDarah = patient.golonganDarah.nama;
    if (bloodTypeStats[golonganDarah]) {
      bloodTypeStats[golonganDarah].pasien++;
    } else {
      bloodTypeStats[golonganDarah] = {
        golonganDarah: golonganDarah,
        pasien: 1,
      };
    }
  });

  return Object.values(bloodTypeStats);
};
