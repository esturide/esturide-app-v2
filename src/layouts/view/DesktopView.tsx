import React from 'react';
import { ItemType } from '@components/navbar/types.ts';
import DesktopNavigationBar from '@components/navbar/DesktopNavigationBar.tsx';

type Props = {
  items: ItemType[];
};

function DesktopView({ children, items }: React.PropsWithChildren<Props>) {
  return (
    <>
      <DesktopNavigationBar items={items} />
      <div
        className={'h-screen pt-16 bg-red-300 px-2 max-md:overflow-y-scroll'}
      >
        {children}
      </div>
    </>
  );
}

export default DesktopView;
