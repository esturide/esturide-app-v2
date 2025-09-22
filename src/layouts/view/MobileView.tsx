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
    <div className={'flex flex-col'}>
      <div
        className={'flex-col h-full pb-20 md:pb-16 max-md:overflow-y-scroll'}
      >
        {children}
      </div>

      <MobileNavigationBar items={items} theme={theme} />
    </div>
  );
}

export default MobileView;
