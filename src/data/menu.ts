import {
  Home,
  LineChart,
  BookUser,
  UserPlus,
  HeartPulse,
  FolderClock,
  BookHeart,
  CalendarFold,
  Cake,
  Syringe,
  BellRing,
  Database
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
    badge: 6, // Assuming only orders have a badge
  },
  {
    link: '/appointment',
    name: 'Pendaftaran',
    icon: BookUser,
  },
  {
    link: '/anamnesis',
    name: 'Anamnesis',
    icon: HeartPulse,
  },
  {
    link: '/checkup',
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
    icon: CalendarFold ,
  },
  {
    link: '/imunisasi',
    name: 'Imunisasi',
    icon: Syringe,
  },
  {
    link: '/records',
    name: 'Riwayat',
    icon: FolderClock,
  },
  {
    link: '/reminder',
    name: 'Pengingat KB',
    icon: BellRing,
  },
  {
    link: '/master-data',
    name: 'Master Data',
    icon: Database,
    adminOnly: true, // Custom property to indicate admin-only menu item
  },
];
