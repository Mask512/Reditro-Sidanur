import { Brand } from './Brand';
import { Menu } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';
import { menus } from '@/data/menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

export const SideNavDrawer = () => {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
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
        <DialogHeader className="hidden sr-only">
          <DialogTitle>Menu</DialogTitle>
          <DialogDescription>Menu</DialogDescription>
        </DialogHeader>
        <nav className="grid gap-2 text-lg font-medium">
          <Accordion type="single" collapsible>
            <NavLink
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Brand className="text-2xl" />
              <span className="sr-only">Home</span>
            </NavLink>
            {menus.map((menu) => {
              if (menu.adminOnly && !isAdmin) {
                return null;
              }

              const Icon = menu.icon;
              if (menu.children) {
                return (
                  <AccordionItem key={menu.link} value={menu.link}>
                    <AccordionTrigger className="p-0 font-semibold">
                      <div className="link-drawer">
                        <Icon className="h-6 w-6" />
                        {menu.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <nav className="pl-2">
                        {menu.children.map((childMenu) => (
                          <NavLink
                            key={childMenu.link}
                            to={childMenu.link}
                            className={({ isActive }) =>
                              isActive ? 'link-drawer-active' : 'link-drawer'
                            }
                          >
                            <childMenu.icon className="h-6 w-6" />
                            {childMenu.name}
                          </NavLink>
                        ))}
                      </nav>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <NavLink
                  key={menu.link}
                  to={menu.link}
                  className={({ isActive }) =>
                    isActive ? 'link-drawer-active' : 'link-drawer'
                  }
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
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
