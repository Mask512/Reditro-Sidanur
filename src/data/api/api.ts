import { APP } from '@/data/app';
import axios from 'axios';
import { clearAuth } from '../../utils/authenticate';
import {
  AccountType,
  JenisKBType,
  LokasiPraktekType,
} from '@/schema/schema';
import { Pasien } from '@/data/api/pasien';

const apiBaseUrl = APP.API_URL;


// Account

export const getAccount = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/account`);
    if (response.data) {
      return response.data as AccountType;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.status === 401) {
      clearAuth();
    }
    throw error;
  }
};

// admin

export const getUsers = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/admin/users`);
  return data;
};

export const deleteUser = async (login: string) => {
  await axios.delete(`${apiBaseUrl}/admin/users/${login}`);
};

export const toggleActiveUser = async (user: AccountType) => {
  user.activated = !user.activated;
  await axios.put(`${apiBaseUrl}/admin/users`, user);
};

// pekerjaan

export const getPekerjaans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pekerjaans`);
  return data;
};

export const addPekerjaan = async (pekerjaan: string) => {
  await axios.post(`${apiBaseUrl}/pekerjaans`, {
    nama: pekerjaan,
  });
};

export const deletePekerjaan = async (id: string) => {
  await axios.delete(`${apiBaseUrl}/pekerjaans/${id}`);
};

// pendidikan

export const getPendidikans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pendidikans`);
  return data;
};

export const addPendidikan = async (nama: string) => {
  await axios.post(`${apiBaseUrl}/pendidikans`, {
    nama: nama,
  });
};

export const deletePendidikan = async (id: string) => {
  await axios.delete(`${apiBaseUrl}/pendidikans/${id}`);
};

// Hubungan penanggung jawab

export const getHubungans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/hubungan-penanggung-jawabs`);
  return data;
};

export const addHubungan = async (nama: string) => {
  await axios.post(`${apiBaseUrl}/hubungan-penanggung-jawabs`, {
    nama: nama,
  });
};

export const deleteHubungan = async (id: string) => {
  await axios.delete(`${apiBaseUrl}/hubungan-penanggung-jawabs/${id}`);
};

// golongan darah

export const getGolonganDarahs = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/golongan-darahs`);
  return data;
};

export const getGolonganDarahById = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/golongan-darahs/${id}`);
  return data;
};

export const addGolonganDarah = async (nama: string) => {
  await axios.post(`${apiBaseUrl}/golongan-darahs`, {
    nama: nama,
  });
};

export const deleteGolonganDarah = async (id: string) => {
  await axios.delete(`${apiBaseUrl}/golongan-darahs/${id}`);
};

// lokasi praktek

export const getDataPraktek = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/lokasi-prakteks`);
  return data as LokasiPraktekType[];
};

export const updateDataPraktek = async (
  id: string,
  newData: LokasiPraktekType,
) => {
  await axios.put(`${apiBaseUrl}/lokasi-prakteks/${id}`, newData);
};

// Jenis KB

export const getJenisKBs = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/jenis-kbs`);
  return data as JenisKBType[];
};

export const addJenisKB = async (nama: string) => {
  await axios.post(`${apiBaseUrl}/jenis-kbs`, {
    nama: nama,
  });
};

export const deleteJenisKB = async (id: string) => {
  await axios.delete(`${apiBaseUrl}/jenis-kbs/${id}`);
};

// pasien

// export const getTotalPatients = async () => {
//   const { data } = await axios.get(`${apiBaseUrl}/pasiens/count`);
//   if (data) {
//     return data;
//   }
// };

// export const getPatients = async () => {
//   const { data } = await axios.get(`${apiBaseUrl}/pasiens`);
//   if (data) {
//     return data;
//   }
// };

// export const getPatientById = async (id: string) => {
//   const { data } = await axios.get(`${apiBaseUrl}/pasiens/${id}`);
//   if (data) {
//     return data;
//   }
// };

// export const addPatient = async (values: PatientType) => {
//   const response = await axios.post(`${apiBaseUrl}/pasiens`, values);
//   return response;
// };

// bidan 

export const getBidans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/bidans`);
  if (data) {
    return data;
  }
};

export const getTotalBidans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/bidans/count`);
  if (data) {
    return data;
  }
};

// kb

export const getRiwayatKB = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/keluarga-berencanas`);
  if (data) {
    return data;
  }
};

export const getTotalKB = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/keluarga-berencanas/count`);
  if (data) {
    return data;
  }
};

// Jenis imunisasi

export const getJenisImunisasi = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/jenis-imunisasis`);
  if (data) {
    return data;
  }
};

// imunisasi

export const getRiwayatImunisasi = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/imunisasis`);
  if (data) {
    return data;
  }
};

export const getTotalImunisasi = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/imunisasis/count`);
  if (data) {
    return data;
  }
};

// pemeriksaan nifas

export const getRiwayatNifas = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pemeriksaan-nifas`);
  if (data) {
    return data;
  }
};

export const getTotalNifas = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pemeriksaan-nifas/count`);
  if (data) {
    return data;
  }
};

// pemeriksaan kehamilan 

export const getRiwayatKehamilan = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pemeriksaan-kehamilans`);
  if (data) {
    return data;
  }
};
export const getTotalKehamilans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/pemeriksaan-kehamilans/count`);
  if (data) {
    return data;
  }
};

// persalinan

export const getRiwayatPersalinan = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/persalinans`);
  if (data) {
    return data;
  }
};

export const getTotalPersalinans = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/persalinans/count`);
  if (data) {
    return data;
  }
};

export const fetchDashboardData = async () => {
  const totalPasien = await Pasien.getTotalPasien();
  const totalBidan = await getTotalBidans();
  const totalPKehamilan = await getTotalKehamilans();
  const totalPersalinan = await getTotalPersalinans();
  const totalNifas = await getTotalNifas();
  const totalKB = await getTotalKB();
  const totalImunisasi = await getTotalImunisasi();

  return {
    totalPasien,
    totalBidan,
    totalPKehamilan,
    totalNifas,
    totalImunisasi,
    totalPersalinan,
    totalKB,
  };
};
