import { APP } from '@/data/app';
import axios from 'axios';

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

export const updateDataPraktek = async (id: string, newData: DataPraktekType) => {
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