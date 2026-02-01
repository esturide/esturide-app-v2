import React, { useEffect } from 'react';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import { filterSchedule } from '$libs/request/schedule.ts';
import { getRequestRoot } from '$libs/request/api.ts';

function RequestRideTravel() {
  useEffect(() => {
    const request = async () => {
      await filterSchedule(
        getRequestRoot(),
        {
          terminate: false,
          cancel: false,
          minPrice: 1,
          maxPrice: 100,
          limit: 10,
        },
        results => {
          console.log(results);
        },
      );
    };

    request();
  });

  return (
    <MainResponsiveLayout>
      <p>!s</p>
    </MainResponsiveLayout>
  );
}

export default RequestRideTravel;
