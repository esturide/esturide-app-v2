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
      <div className={'pt-16'}>{children}</div>
    </>
  );
}

export default DesktopView;
