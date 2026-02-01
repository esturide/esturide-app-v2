import React from 'react';
import { ItemType } from '@components/navbar/types.ts';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';

type Props = {
  items: ItemType[];
};

function DesktopView({ children, items }: React.PropsWithChildren<Props>) {
  return (
    <div className={'flex flex-col'}>
      <div className={'h-16'}>
        <DesktopNavigationBar items={items} />
      </div>

      <div className={'top-16 h-screen max-md:overflow-y-scroll'}>
        {children}
      </div>
    </div>
  );
}

export default DesktopView;
