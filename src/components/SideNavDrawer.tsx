import { Brand } from './Brand';
import { Menu } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';
import { menus } from '@/data/menu';

export const SideNavDrawer = () => {
  return (
    <Sheet>
      {/* Nav Button */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      {/* Nav Content */}
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <NavLink
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Brand className='text-xl'/>
            <span className="sr-only">Home</span>
          </NavLink>
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <NavLink
                key={menu.link}
                to={menu.link}
                className={({isActive})=> isActive ? 'link-drawer-active' : 'link-drawer'}
              >
                <Icon className="h-5 w-5" />
                {menu.name}
                {/* {menu.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {menu.badge}
                  </Badge>
                )} */}
              </NavLink>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
