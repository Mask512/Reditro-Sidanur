import {
  Activity,
  Baby,
  HeartPulse,
  LucideProps,
  Pill,
  Syringe,
  UsersRound,
} from 'lucide-react';
import { BreadCrumb } from '../BreadCrumb';

import { useEffect, useState } from 'react';
import { DashboardCard } from '../DashboardCard';
import { fetchDashboardData } from '@/data/api/api';
import { ChartPendidikan } from '../ChartPendidikan';
import { ChartGolonganDarah } from '../ChartGolonganDarah';

const parentLinks = [{ href: '/', label: 'Home' }];

function Icon({ icon: IconComponent }: { icon: React.FC<LucideProps> }) {
  return <IconComponent className="h-1/4 w-1/4 text-muted-foreground" />;
}

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPasien: 0,
    totalBidan: 0,
    totalPKehamilan: 0,
    totalPersalinan: 0,
    totalNifas: 0,
    totalKB: 0,
    totalImunisasi: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <BreadCrumb pageName="Dashboard" parentLinks={parentLinks} />
      <div className="grid gap-4 md:grid-cols-2 xl:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
        <DashboardCard
          title="Pasien Terdaftar"
          value={dashboardData.totalPasien}
          info="pasien"
          icon={<Icon icon={UsersRound} />}
        />
        <DashboardCard
          title="Total Bidan"
          value={dashboardData.totalBidan}
          info="bidan"
          icon={<Icon icon={HeartPulse} />}
        />
        <DashboardCard
          title="Periksa Kehamilan"
          value={dashboardData.totalPKehamilan || 0}
          info="terlayani"
          icon={<Icon icon={HeartPulse} />}
        />
        <DashboardCard
          title="Persalinan"
          value={dashboardData.totalPersalinan || 0}
          info="terlayani"
          icon={<Icon icon={Baby} />}
        />
        <DashboardCard
          title="Perawatan Nifas"
          value={dashboardData.totalNifas || 0}
          info="terlayani"
          icon={<Icon icon={Activity} />}
        />
        <DashboardCard
          title="Pelayanan KB"
          value={dashboardData.totalKB || 0}
          info="terlayani"
          icon={<Icon icon={Pill} />}
        />
        <DashboardCard
          title="Imunisasi"
          value={dashboardData.totalImunisasi || 0}
          info="terlayani"
          icon={<Icon icon={Syringe} />}
        />
        <div ></div>
      <ChartPendidikan />
      <ChartGolonganDarah />
      </div>
    </>
  );
};
