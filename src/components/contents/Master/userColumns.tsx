import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmAlert } from '@/components/ConfirmAlert';
import { authority, UserType } from '@/utils/api';

export const userColumns = (
  handleDelete: (login: string) => void,
  _handleUpdate: (user: UserType) => void,
  toggleActive: (user: UserType) => void,
): ColumnDef<UserType>[] => [
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
      const authorities = row.getValue('authorities') as authority[];
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
        <Button className='w-20' variant={isActive ? 'ghost' : 'secondary'} onClick={() => toggleActive(user)}>
          {isActive ? 'Active' : 'Inactive'}
        </Button>
      );
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-row gap-2">
          <Button variant="outline" disabled>Edit</Button>
          <ConfirmAlert
          messages={{
            title: 'Hapus User ?',
            description: `${row.original.firstName} ${row.original.lastName} akan dihapus secara permanen .`,
          }}
          buttonVariant="destructive"
          action={() => handleDelete(user.login)}
          actionName="Hapus"
          icon={<Trash className="mr-2 h-4 w-4" />}
        />
        </div>
      );
    },
  },
];
