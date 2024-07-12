import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';
import { userColumns } from './userColumns';
import { BreadCrumb } from '@/components/BreadCrumb';
import { deleteUser, getUsers, toggleActiveUser } from '@/utils/api';
import { AccountType } from '@/schema/schema';

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

  const handleUpdate = (user: AccountType) => {
    // Implement your update logic here
    console.log('update user', user);
  };

  const toggleActive = async (user: AccountType) => {
    await toggleActiveUser(user);
    fetchUsers();
  };

  return (
    <>
      <BreadCrumb pageName="User Management" parentLinks={parentLinks} />
      <h1 className="text-xl font-semibold">User Management</h1>
      <DataTable
        columns={userColumns(handleDelete, handleUpdate, toggleActive)}
        data={data}
        filterColumns={{
          key: 'login',
          placeholder: 'Cari Username ...',
        }}
      />
    </>
  );
};
