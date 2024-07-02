import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
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

    <Link to="/master-data/user-management">
      <Button variant="outline" className="max-w-sm">
        User Management
      </Button>
    </Link>
  </>
);