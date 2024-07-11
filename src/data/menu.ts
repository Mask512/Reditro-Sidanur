import {
  Home,
  LineChart,
  // BookUser,
  UserPlus,
  // HeartPulse,
  FolderClock,
  BookHeart,
  CalendarFold,
  Cake,
  Syringe,
  BellRing,
  Database,
} from 'lucide-react';

export const menus = [
  {
    link: '/dashboard',
    name: 'Dashboard',
    icon: Home,
  },
  {
    link: '/register',
    name: 'Registrasi Pasien',
    icon: UserPlus,
    // badge: 6, // Assuming only orders have a badge
  },
  // {
  //   link: '/appointment',
  //   name: 'Pendaftaran',
  //   icon: BookUser,
  // },
  // {
  //   link: '/anamnesis',
  //   name: 'Anamnesis',
  //   icon: HeartPulse,
  // },
  {
    link: '/kehamilan',
    name: 'Kehamilan',
    icon: BookHeart,
  },
  {
    link: '/persalinan',
    name: 'Persalinan',
    icon: Cake,
  },
  {
    link: '/nifas',
    name: 'Nifas',
    icon: LineChart,
  },
  {
    link: '/kb',
    name: 'KB',
    icon: CalendarFold,
  },
  {
    link: '/imunisasi',
    name: 'Imunisasi',
    icon: Syringe,
  },
  {
    link: '/riwayat',
    name: 'Riwayat',
    icon: FolderClock,
  },
  {
    link: '/reminder-kb',
    name: 'Pengingat KB',
    icon: BellRing,
  },
  {
    link: '/master-data',
    name: 'Master Data',
    icon: Database,
    adminOnly: true,
  },
];

export const masterMenus = [
  {
    link: 'data-praktek',
    name: 'Data Praktek',
  },
  {
    link: 'user-management',
    name: 'User Management',
  },
  {
    link: 'golongan-darah',
    name: 'Golongan Darah',
  },
  {
    link: 'pendidikan',
    name: 'Pendidikan',
  },
  {
    link: 'hubungan',
    name: 'Penanggung Jawab',
  },
  {
    link: 'pekerjaan',
    name: 'Pekerjaan',
  },
  {
    link: 'jenis-kb',
    name: 'Jenis KB',
  },
  {
    link: 'jenis-imunisasi',
    name: 'Jenis Imunisasi',
  },
  {
    link: 'bidan',
    name: 'Data Bidan',
  },
];
