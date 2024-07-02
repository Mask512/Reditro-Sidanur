import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { authority, User } from './UserManagement';

export const userColumns = (
  handleDelete: (login: string) => void,
  _handleUpdate: (user: User) => void,
  toggleActive: (user: User) => void,
): ColumnDef<User>[] => [
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
      const data = row.original;
      return (
        <Button className='w-20' variant={isActive ? 'ghost' : 'secondary'} onClick={() => toggleActive(data)}>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this account and remove this data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(user.login)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
