import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const menus = [
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
    name: 'Hubungan',
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
    link: 'bidan',
    name: 'Data Bidan',
  },
];

export const MasterDataHome = () => (
  <>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Master Data</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div className="grid grid-cols-3 gap-4 max-w-xl">
      {menus.map((menu) => {
        return (
          <Link key={menu.link} to={`/master-data/${menu.link}`}>
            <Button variant="outline" className="w-full">
              {menu.name}
            </Button>
          </Link>
        );
      })}
    </div>
  </>
);
