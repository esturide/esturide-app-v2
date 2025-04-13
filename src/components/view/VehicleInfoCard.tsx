import React from 'react';
import { IconType } from 'react-icons';
import { FaCar } from 'react-icons/fa';

type Props = {
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  icon?: IconType;
  onClick?: () => Promise<void>;
};

const VehicleInfoCard: React.FC<Props> = ({
  model,
  year,
  licensePlate,
  color,
  icon: Icon = FaCar,
  onClick = async () => {},
}) => {
  return (
    <section className="max-w-[327px]" onBlur={onClick}>
      <article className="w-full bg-white">
        <div className="flex flex-col pb-2 pl-6 w-full bg-white rounded-l-3xl rounded-b-3xl border-2 border-solid border-[#3E8E7E]">
          <header className="flex z-10 gap-5 justify-between mt-0 text-xl font-bold text-gray-900">
            <h2 className="self-end mt-2">
              {model} {year}
            </h2>
            <div className="object-contain shrink-0 w-11 h-11 flex items-center justify-center text-[#3E8E7E] bg-[#3E8E7E] rounded-bl-xl">
              <Icon size={32} aria-hidden="true" color={'white'} />
            </div>
          </header>
          <p className="self-center mt-2 text-base text-center text-neutral-600">
            {licensePlate} | {color}
          </p>
        </div>
      </article>
    </section>
  );
};

export default VehicleInfoCard;
