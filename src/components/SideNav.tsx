import { Link, useLocation } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
import { Brand } from './Brand';
import { menus } from '@/data/menu';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, RootState } from '@/store/store';
import { useEffect } from 'react';
import { getAccount } from '@/utils/api';

export const SideNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const data = await getAccount();
        const roles = data.authorities;
        const isAdmin = roles.find((role) => role === 'ROLE_ADMIN');
        if (isAdmin) {
          dispatch(adminLogin());
        }
      } catch (error) {
        console.error('Error fetching authorities:', error);
      }
    };

    fetchAuthorities();
  }, [dispatch]);

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        {/* Nav Layout */}

        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Nav Header */}

          <Brand className="text-xl" />

          {/* Nav Content */}

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menus.map((menu) => {
                if (menu.adminOnly && !isAdmin) {
                  return null;
                }
                const Icon = menu.icon;
                return (
                  <Link
                    key={menu.link}
                    to={menu.link}
                    className={`${
                      isActive(menu.link) ? 'link-active' : 'link'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {menu.name}
                    {/* {menu.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {menu.badge}
                      </Badge>
                    )} */}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
