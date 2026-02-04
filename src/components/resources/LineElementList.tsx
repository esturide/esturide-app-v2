import React from 'react';
import { IconType } from 'react-icons';

export type LineItem = {
  title?: string;
  icon: IconType;
  item: React.FC;
};

type Props = {
  elements?: LineItem[];
};

const LineElementList: React.FC<Props> = ({ elements = [] }) => {
  const ElementLi = (element: LineItem) => {
    const Icon = element.icon;
    const Inner = element.item;

    return (
      <li className="mb-2 ms-6">
        <span className="absolute bg-stone-300 flex items-center justify-center ring-3 ring-stone-300 size-6 bg-brand-softer rounded-full -start-3">
          <Icon className={'text-stone-400 size-4'} />
        </span>

        <div>
          {element.title && (
            <h3 className="flex items-center mb-1 text-lg font-semibold text-heading">
              {element.title}
            </h3>
          )}
          <Inner />
        </div>
      </li>
    );
  };

  return (
    <>
      <ol className="relative border-stone-300 border-s border-default">
        {elements.map(element => ElementLi(element))}
      </ol>
    </>
  );
};

export default LineElementList;
