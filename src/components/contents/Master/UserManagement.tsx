import { DataTable } from '@/components/ui/data-table';
import { APP } from '@/data/app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { userColumns } from './userColumns';
import { BreadCrumb } from '@/components/BreadCrumb';

export type authority = 'ROLE_USER' | 'ROLE_ADMIN';
const parentLinks = [{ href: '/master-data', label: 'Master Data' }];

export type User = {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: authority[];
};

export const UserManagement = () => {
  const [data, setData] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get(`${APP.API_URL}/admin/users`);
    setData(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [setData]);

  const handleDelete = async (login: string) => {
    // need fix
    await axios.delete(`${APP.API_URL}/admin/users/${login}`);
    fetchUsers();
  };

  const handleUpdate = (user: User) => {
    // Implement your update logic here
    console.log('update user', user);
  };

  const toggleActive = async (user: User) => {
    user.activated = !user.activated;
    await axios.put(`${APP.API_URL}/admin/users`, user);
    
    fetchUsers();
  };

  return (
    <>
      <BreadCrumb pageName='User Management' parentLinks={parentLinks}/>
      <h1 className="text-xl font-semibold">User Management</h1>
      <DataTable
        columns={userColumns(handleDelete, handleUpdate, toggleActive)}
        data={data}
      />
    </>
  );
};
