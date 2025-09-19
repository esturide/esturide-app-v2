import React, { useId } from 'react';

type Props = {
  address: string;
};

const AddressResult = ({ address }: Props) => {
  const id = useId();

  return (
    <button
      id={id}
      className="text-xl text-left focus:bg-gray-500 focus:text-white bg-gray-100 py-2 px-4 rounded-[40px] font-semibold m-1"
    >
      <p>{address}</p>
    </button>
  );
};

export default AddressResult;
