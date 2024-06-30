import { Link, useLocation } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
import { Brand } from './Brand';
import { menus } from '@/data/menu';

export const SideNav = () => {
  const location = useLocation();

  // Function to check if a given path matches the current location
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        {/* Nav Layout */}

        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Nav Header */}

          <Brand className='text-xl' />

          {/* Nav Content */}

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menus.map((menu) => {
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
