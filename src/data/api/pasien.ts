import axios from "axios";
import { APP } from '@/data/app';
import { PatientType } from "@/schema/schema";
const apiBaseUrl = APP.API_URL;

export const Pasien = {
  async getTotalPasien() {
    const { data } = await axios.get(`${apiBaseUrl}/pasiens/count`);
    return data;
  },

  async getPasiens() {
    const { data } = await axios.get(`${apiBaseUrl}/pasiens`);
    return data;
  },

  async getPasienById(id: string) {
    const { data } = await axios.get(`${apiBaseUrl}/pasiens/${id}`);
    return data;
  },

  async addPasien(values: PatientType) {
    const response = await axios.post(`${apiBaseUrl}/pasiens`, values);
    return response.data;
  }
};