import React from 'react';
import { ItemType } from '@components/navbar/types.ts';
import MobileNavigationBar from '@components/navbar/MobileNavigationBar.tsx';
import ColorTheme from '$libs/types/Theme.ts';

type Props = {
  items: ItemType[];
  theme: ColorTheme;
};

function MobileView({
  children,
  items,
  theme,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <div className={'h-screen max-md:overflow-y-scroll'}>{children}</div>
      <MobileNavigationBar items={items} theme={theme} />
    </>
  );
}

export default MobileView;
