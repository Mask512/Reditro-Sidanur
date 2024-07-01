import { Brand } from './Brand';
import { ModeToggle } from './mode-toggle';
import { ProfileMenu } from './ProfileMenu';
import { SideNavDrawer } from './SideNavDrawer';

export const TopBar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SideNavDrawer />
      <div className="w-full flex-1 ">
        <Brand className="md:hidden" />
      </div>

      <ProfileMenu  />
      <ModeToggle />
    </header>
  );
};
