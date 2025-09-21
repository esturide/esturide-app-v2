import React, { HTMLProps, useState } from 'react';
import { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';

import '@styles/background/gradient/gradient-animation-card.scss';

type Props = {
  icon?: IconType | string;
  title: string;
  content: string | string[];
  onClick?: () => Promise<void>;
  color?: HTMLProps<HTMLElement>['className'];
};

const ButtonCard: React.FC<Props> = ({
  icon = FaReact,
  title,
  content,
  onClick = async () => {},
  color,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const IconComponent = typeof icon === 'string' ? undefined : icon;

  const handlePress = async () => {
    setIsPressed(true);

    await onClick();
  };

  return (
    <button
      onClick={handlePress}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        flex flex-col max-w-[327px] w-full text-left
        transition-all duration-300
      `}
      aria-label={`${title} card`}
    >
      <div
        className={`
        bg-gradient-animated-card flex gap-3 px-5 py-4 rounded-[32px]
        hover:shadow-md transition-shadow duration-300 border border-gray-100 shadow
        ${isPressed ? `bg-opacity-50 bg-blur-md ${color}` : 'bg-white'}
      `}
      >
        <div
          className={`flex flex-col justify-center items-center px-3.5 ${color} h-[78px] rounded-[32px] w-[78px]`}
        >
          {IconComponent ? (
            <IconComponent
              className="w-[50px] h-[50px] text-white"
              aria-hidden="true"
            />
          ) : (
            <img
              src={icon as string}
              alt=""
              className="object-contain aspect-square w-[50px] filter invert"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex flex-col self-start">
          <h2 className="self-start text-xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="text-base text-neutral-600">
            {Array.isArray(content) ? (
              content.map((item, index) => (
                <p key={index} className="mt-1">
                  {`- ${item}`}
                </p>
              ))
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ButtonCard;
