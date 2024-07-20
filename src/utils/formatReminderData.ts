import {
  PemeriksaanImunisasiType,
  PemeriksaanKBType,
  PemeriksaanKehamilanType,
} from '@/schema/schema';

// Define common interface for all types
interface CommonPemeriksaan {
  tanggalPemeriksaan?: string | null;
  tanggalKembaliKB?: string | null;
  tanggalKembaliImunisasi?: string | null;
  riwayatKehamilanTPorHPL?: string | null;
  jenisPemeriksaan: string;
  tindakan: string;
  pasien: {
    nama: string;
    nomorPasien: string;
  };
  bidan: {
    nama: string;
    noHp: string;
  };
}

// Extend each existing type with additional properties
type ExtendedPemeriksaanKBType = PemeriksaanKBType & CommonPemeriksaan;
type ExtendedPemeriksaanImunisasiType = PemeriksaanImunisasiType &
  CommonPemeriksaan;
type ExtendedPemeriksaanKehamilanType = PemeriksaanKehamilanType &
  CommonPemeriksaan;

// Define a union type of all extended types
type PemeriksaanType =
  | ExtendedPemeriksaanKBType
  | ExtendedPemeriksaanImunisasiType
  | ExtendedPemeriksaanKehamilanType;

// Define the shape of formatted data rows
export type FormattedDataRow = {
  'No.': number;
  'Jenis Pemeriksaan': string;
  Tindakan: string;
  'Nama Pasien': string;
  'Nomor Pasien': string;
  'Nama Bidan': string;
  'Nomor Telepon Pasien': string;
  'Tanggal Pemeriksaan'?: string | null;
  'Tanggal Kembali'?: string | null;
};

// Function to format data into table format
export const formatDataToTable = (data: PemeriksaanType[]) => {
  const formattedData: FormattedDataRow[] = [];

  data.forEach((item, index) => {
    const tanggalPemeriksaan =
      item.tanggalPemeriksaan ||
      item.tanggalKembaliKB ||
      item.tanggalKembaliImunisasi ||
      item.riwayatKehamilanTPorHPL;
    const tanggalKembali =
      item.tanggalKembaliKB ||
      item.tanggalKembaliImunisasi ||
      item.riwayatKehamilanTPorHPL;

    // Skip data jika tanggal pemeriksaan atau tanggal kembali sudah melebihi hari ini
    if (tanggalKembali && new Date(tanggalKembali) < new Date()) {
      return;
    }

    const row: FormattedDataRow = {
      'No.': index + 1,
      'Jenis Pemeriksaan': item.jenisPemeriksaan,
      Tindakan: item.tindakan,
      'Nama Pasien': item.pasien.nama,
      'Nomor Pasien': item.pasien.nomorPasien,
      'Nama Bidan': item.bidan.nama,
      'Nomor Telepon Pasien': item.pasien.noTelp,
      'Tanggal Pemeriksaan': tanggalPemeriksaan,
      'Tanggal Kembali': tanggalKembali,
    };
    formattedData.push(row);
  });

  // Sortir berdasarkan tanggal kembali terdekat ke hari ini ke terlama
  formattedData.sort((a, b) => {
    const dateA = a['Tanggal Kembali'] ? new Date(a['Tanggal Kembali']) : null;
    const dateB = b['Tanggal Kembali'] ? new Date(b['Tanggal Kembali']) : null;

    if (dateA && dateB) {
      return dateA.getTime() - dateB.getTime(); // Urutan dateA - dateB untuk terdekat ke terlama
    } else if (dateA) {
      return -1; // dateA ada, dateB tidak ada, sehingga dateA lebih awal dari dateB
    } else if (dateB) {
      return 1; // dateB ada, dateA tidak ada, sehingga dateB lebih awal dari dateA
    } else {
      return 0; // kedua tanggal tidak terdefinisi/null
    }
  });

  return formattedData;
};

export const daysUntil = (inputDate: string) => {
  // Membuat objek Date dari input tanggal
  const targetDate = new Date(inputDate);

  // Mendapatkan tanggal hari ini
  const today = new Date();

  // Menghitung perbedaan dalam milidetik antara targetDate dan today
  const difference = targetDate.getTime() - today.getTime();

  // Menghitung jumlah hari dari perbedaan dalam milidetik
  const days = Math.ceil(difference / (1000 * 3600 * 24));

  return days;
};
