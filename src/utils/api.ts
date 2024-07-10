import { PatientType } from '@/components/contents/Register';
import { APP } from '@/data/app';
import axios from 'axios';

export type authority = 'ROLE_USER' | 'ROLE_ADMIN';

type AccountResponse = {
  authorities: authority[];
}

export const getAccount = async () => {
  const { data } = await axios.get(`${APP.API_URL}/account`);
  return data as AccountResponse;
};

export type UserType = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: authority[];
};

export const getUsers = async () => {
  const { data } = await axios.get(`${APP.API_URL}/admin/users`);
  return data ;
};

export const deleteUser = async (login: string) => {
  await axios.delete(`${APP.API_URL}/admin/users/${login}`);
};

export const toggleActiveUser = async (user: UserType) => {
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

export type DataPraktekType = {
  id: string;
  nama: string;
  alamat: string;
  bidan: string | null;
};

export const getDataPraktek = async () => {
  const { data } = await axios.get(`${APP.API_URL}/lokasi-prakteks`);
  return data as DataPraktekType[];
};

export const updateDataPraktek = async (
  id: string,
  newData: DataPraktekType,
) => {
  await axios.put(`${APP.API_URL}/lokasi-prakteks/${id}`, newData);
};

export type JenisKBType = {
  id: string;
  nama: string;
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

export const getPatientById = async (id:string) => {
  const { data } = await axios.get(`${APP.API_URL}/pasiens/${id}`);
  if (data) {
    return data;
  }
};

export const addPatient = async (values: PatientType) => {
  const response = await axios.post(`${APP.API_URL}/pasiens`, values);  
  return response;
};
