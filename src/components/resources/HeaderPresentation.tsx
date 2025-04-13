import React from 'react';
import ProgressIndicator from '@components/resources/ProgressIndicator.tsx';
import SymbolButton from '@components/buttons/SymbolButton.tsx';

type Props = {
  showBackward?: boolean;
  showForward?: boolean;
  onBackwardClick?: () => Promise<void>;
  onForwardClick?: () => Promise<void>;
};

const HeaderPresentation: React.FC<Props> = ({
  showBackward = false,
  showForward = false,
  onBackwardClick = async () => {},
  onForwardClick = async () => {},
}) => {
  return (
    <>
      <div className={'flex flex-row items-around justify-between'}>
        <div className={!showBackward ? 'invisible' : 'visible'}>
          <SymbolButton direction={'backward'} onClick={onBackwardClick} />
        </div>

        <div className={'flex flex-col items-center justify-center gap-4'}>
          <div className={'text-4xl font-bold text-white'}>Header</div>
          <ProgressIndicator steps={3} current={2} />
        </div>

        <div className={!showForward ? 'invisible' : 'visible'}>
          <SymbolButton direction={'forward'} onClick={onForwardClick} />
        </div>
      </div>
    </>
  );
};

export default HeaderPresentation;
