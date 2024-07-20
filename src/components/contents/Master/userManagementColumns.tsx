import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AccountType, Authority } from '@/schema/schema';
export const userManagementColumns = (
  toggleActive: (user: AccountType) => void,
  handleAction: (user: AccountType) => React.ReactNode,
): ColumnDef<AccountType>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'login',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const firstName = row.getValue('firstName');
      const lastName = row.original.lastName;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'authorities',
    header: 'Role',
    cell: ({ row }) => {
      const authorities = row.getValue('authorities') as Authority[];
      const isAdmin = authorities.some(
        (authority) => authority === 'ROLE_ADMIN',
      );

      return isAdmin ? (
        <Badge>Admin</Badge>
      ) : (
        <Badge variant="secondary">User</Badge>
      );
    },
  },
  {
    accessorKey: 'lastModifiedDate',
    header: 'Last Modified',
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastModifiedDate'));
      const formatted = date.toLocaleDateString('id-ID');
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'activated',
    header: 'Activated',
    cell: ({ row }) => {
      const isActive: boolean = row.getValue('activated');
      const user = row.original;
      return (
        <Button
          className="w-20"
          variant={isActive ? 'ghost' : 'secondary'}
          onClick={() => toggleActive(user)}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Button>
      );
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return handleAction(user);
    },
  },
];
