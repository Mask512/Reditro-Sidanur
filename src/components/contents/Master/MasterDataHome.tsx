import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { masterMenus } from '@/data/menu';
import { Link } from 'react-router-dom';

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
      {masterMenus.map((menu) => {
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
