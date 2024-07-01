import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { clearAuth } from '@/utils/authenticate';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APP } from '@/data/app';
import axios from 'axios';
import { CircleUser } from 'lucide-react';

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };
  const [username, setUsername] = useState('John Doe');
  const [name, setName] = useState('John Doe');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await axios.get(`${APP.API_URL}/account`);
        if (data) {
          setUsername(data.login);
          setName(`${data.firstName} ${data.lastName}`);
        } else {
          throw new Error('data not found');
        }
      } catch (error) {
        console.error('Error fetching accounts', error);
      }
    };

    fetchAccount();
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <CircleUser className="h-5 w-5 mr-2" />
            {username}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
