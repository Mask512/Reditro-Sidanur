import React from 'react';
import { Brand } from './Brand';
import { ModeToggle } from './mode-toggle';
import { ProfileMenu } from './ProfileMenu';
import { SideNavDrawer } from './SideNavDrawer';

type TopBarProps = {
  handleLogout: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TopBar = ({ handleLogout }: TopBarProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SideNavDrawer />
      <div className="w-full flex-1 ">
        <Brand className="md:hidden" />
      </div>

      <ProfileMenu handleLogout={handleLogout} />
      <ModeToggle />
    </header>
  );
};
