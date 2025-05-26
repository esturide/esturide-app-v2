import * as React from 'react';

type Props = {
  communityName: string;
  description: string;
  hasUnreadMessage?: boolean;
  lastMessageTime: string;
  onClick?: () => void;
};

function CommunityCard({
  communityName,
  description,
  hasUnreadMessage = false,
  lastMessageTime,
  onClick = null,
}: Props) {
  React.useEffect(() => {
    const fontLinkId = 'community-card-fonts';
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement('link');
      link.id = fontLinkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=SF+Pro:wght@400;590&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div>
      <article
        className="flex relative shrink-0 justify-center items-center h-[73px] w-[340px] max-md:w-full max-md:max-w-[340px] max-sm:w-full max-sm:max-w-[340px] cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            if(onClick !== null) {
              onClick();
            }
          }
        }}
      >
        <section className="relative shrink-0 h-[73px] w-[340px] max-md:w-full max-sm:w-full">
          <div className="flex absolute top-0 left-0 shrink-0 justify-center items-center bg-white h-[73px] w-[340px] max-md:w-full max-sm:w-full" />

          <div className="flex absolute left-7 shrink-0 justify-center items-center pt-0 h-px top-[72px] w-[312px] max-md:w-[calc(100%_-_28px)] max-sm:w-[calc(100%_-_28px)]" />

          <span className="absolute w-2.5 h-5 text-base leading-5 text-right font-[590] left-[313px] text-zinc-700 text-opacity-30 top-[9px] max-sm:text-sm">
          A
        </span>

          <time className="absolute h-4 text-sm font-bold text-right left-[238px] text-zinc-700 text-opacity-60 top-[9px] w-[65px] max-sm:text-xs">
            {lastMessageTime}
          </time>

          <h2 className="absolute shrink-0 pt-0 pr-24 pb-px pl-0 h-5 text-base font-bold text-black left-[46px] top-[7px] w-[127px] max-sm:text-base">
            {communityName}
          </h2>

          <p className="absolute top-8 shrink-0 text-sm font-bold h-[37px] left-[46px] text-zinc-700 text-opacity-60 w-[262px] max-sm:text-xs">
            {description}
          </p>

          {hasUnreadMessage && (
            <div className="absolute left-[17px] top-[31px]">
              <svg
                width={11}
                height={11}
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-[10px] h-[11px] flex-col justify-center items-center flex-shrink-0"
                aria-label="Unread message indicator"
              >
                <circle cx="6.23853" cy="6.23682" r="5.5" fill="#3E8E7E" />
              </svg>
            </div>
          )}
        </section>
      </article>
    </div>
  );
}

export default CommunityCard;
