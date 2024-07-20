import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';
import { userManagementColumns } from './userManagementColumns';
import { BreadCrumb } from '@/components/BreadCrumb';
import { deleteUser, getUsers, toggleActiveUser } from '@/data/api/api';
import { AccountType } from '@/schema/schema';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserManagementForm } from './UserManagementForm';

const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export const UserManagement = () => {
  const [data, setData] = useState<AccountType[]>([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setData(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [setData]);

  const handleDelete = async (login: string) => {
    await deleteUser(login);
    fetchUsers();
  };

  const toggleActive = async (user: AccountType) => {
    await toggleActiveUser(user);
    fetchUsers();
  };

  const handleSubmitSuccess = () => {
    fetchUsers();
  };

  const handleAction = (user: AccountType) => {
    return (
      <div className="flex flex-row gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md md:max-w-lg overflow-y-scroll max-h-screen">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Isi data .</DialogDescription>
            </DialogHeader>
            <UserManagementForm
              data={user}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </DialogContent>
        </Dialog>

        <ConfirmAlert
          messages={{
            title: 'Hapus User ?',
            description: `${user.firstName} ${user.lastName} akan dihapus secara permanen .`,
          }}
          buttonVariant="destructive"
          action={() => handleDelete(user.login)}
          actionName="Hapus"
          icon={<Trash className="mr-2 h-4 w-4" />}
        />
      </div>
    );
  };

  return (
    <>
      <BreadCrumb pageName="User Management" parentLinks={parentLinks} />
      <h1 className="text-xl font-semibold">User Management</h1>
      <DataTable
        columns={userManagementColumns(toggleActive, handleAction)}
        data={data}
        filterColumns={{
          key: 'login',
          placeholder: 'Cari Username ...',
        }}
      />
    </>
  );
};
