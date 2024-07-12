import { APP } from '@/data/app';
import axios from 'axios';
import { clearAuth } from './authenticate';
import { AccountType, JenisKBType, LokasiPraktekType, PatientType } from '@/schema/schema';

export const getAccount = async () => {
  try {
    const response = await axios.get(`${APP.API_URL}/account`);
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

export const getUsers = async () => {
  const { data } = await axios.get(`${APP.API_URL}/admin/users`);
  return data;
};

export const deleteUser = async (login: string) => {
  await axios.delete(`${APP.API_URL}/admin/users/${login}`);
};

export const toggleActiveUser = async (user: AccountType) => {
  user.activated = !user.activated;
  await axios.put(`${APP.API_URL}/admin/users`, user);
};

export const getPekerjaans = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pekerjaans`);
  return data;
};

export const addPekerjaan = async (pekerjaan: string) => {
  await axios.post(`${APP.API_URL}/pekerjaans`, {
    nama: pekerjaan,
  });
};

export const deletePekerjaan = async (id: string) => {
  await axios.delete(`${APP.API_URL}/pekerjaans/${id}`);
};

export const getPendidikans = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pendidikans`);
  return data;
};

export const addPendidikan = async (nama: string) => {
  await axios.post(`${APP.API_URL}/pendidikans`, {
    nama: nama,
  });
};

export const deletePendidikan = async (id: string) => {
  await axios.delete(`${APP.API_URL}/pendidikans/${id}`);
};

export const getHubungans = async () => {
  const { data } = await axios.get(`${APP.API_URL}/hubungan-penanggung-jawabs`);
  return data;
};

export const addHubungan = async (nama: string) => {
  await axios.post(`${APP.API_URL}/hubungan-penanggung-jawabs`, {
    nama: nama,
  });
};

export const deleteHubungan = async (id: string) => {
  await axios.delete(`${APP.API_URL}/hubungan-penanggung-jawabs/${id}`);
};

export const getGolonganDarahs = async () => {
  const { data } = await axios.get(`${APP.API_URL}/golongan-darahs`);
  return data;
};

export const getGolonganDarahById = async (id: string) => {
  const { data } = await axios.get(`${APP.API_URL}/golongan-darahs/${id}`);
  return data;
};

export const addGolonganDarah = async (nama: string) => {
  await axios.post(`${APP.API_URL}/golongan-darahs`, {
    nama: nama,
  });
};

export const deleteGolonganDarah = async (id: string) => {
  await axios.delete(`${APP.API_URL}/golongan-darahs/${id}`);
};


export const getDataPraktek = async () => {
  const { data } = await axios.get(`${APP.API_URL}/lokasi-prakteks`);
  return data as LokasiPraktekType[];
};

export const updateDataPraktek = async (
  id: string,
  newData: LokasiPraktekType,
) => {
  await axios.put(`${APP.API_URL}/lokasi-prakteks/${id}`, newData);
};

export const getJenisKBs = async () => {
  const { data } = await axios.get(`${APP.API_URL}/jenis-kbs`);
  return data as JenisKBType[];
};

export const addJenisKB = async (nama: string) => {
  await axios.post(`${APP.API_URL}/jenis-kbs`, {
    nama: nama,
  });
};

export const deleteJenisKB = async (id: string) => {
  await axios.delete(`${APP.API_URL}/jenis-kbs/${id}`);
};

export const getTotalPatients = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pasiens/count`);
  if (data) {
    return data;
  }
};

export const getPatients = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pasiens`);
  if (data) {
    return data;
  }
};

export const getPatientById = async (id: string) => {
  const { data } = await axios.get(`${APP.API_URL}/pasiens/${id}`);
  if (data) {
    return data;
  }
};

export const addPatient = async (values: PatientType) => {
  const response = await axios.post(`${APP.API_URL}/pasiens`, values);
  return response;
};

export const getBidans = async () => {
  const { data } = await axios.get(`${APP.API_URL}/bidans`);
  if (data) {
    return data;
  }
};
export const getRiwayatKB = async () => {
  const { data } = await axios.get(`${APP.API_URL}/keluarga-berencanas`);
  if (data) {
    return data;
  }
};

export const getJenisImunisasi = async () => {
  const { data } = await axios.get(`${APP.API_URL}/jenis-imunisasis`);
  if (data) {
    return data;
  }
};

export const getRiwayatImunisasi = async () => {
  const { data } = await axios.get(`${APP.API_URL}/imunisasis`);
  if (data) {
    return data;
  }
};

export const getRiwayatNifas = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pemeriksaan-nifas`);
  if (data) {
    return data;
  }
};

export const getRiwayatKehamilan = async () => {
  const { data } = await axios.get(`${APP.API_URL}/pemeriksaan-kehamilans`);
  if (data) {
    return data;
  }
};

export const getRiwayatPersalinan = async () => {
  const { data } = await axios.get(`${APP.API_URL}/persalinans`);
  if (data) {
    return data;
  }
};

