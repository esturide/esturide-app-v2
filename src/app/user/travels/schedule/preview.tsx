'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoogleMapView from '@components/map/google/view/MapView.tsx';
import GoogleRouting from '@components/map/google/GoogleRouting.tsx';
import { all } from '$libs/functional.ts';
import { failureMessage } from '$libs/toast/failure.ts';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

function PreviewScheduleTravel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addressFrom = searchParams.get('addressFrom') ?? '';
  const addressTo = searchParams.get('addressTo') ?? '';

  const validDirections = (a: string, b: string) => {
    return all([a, b], d => d.length > 0);
  };

  const catchNotFoundRoute = () => {
    failureMessage('Could not find a route.');
    router.replace('/home/travels/schedule');
  };

  useEffect(() => {
    if (!validDirections(addressTo, addressFrom)) {
      failureMessage('Both addresses are invalid.');
      router.replace('/home/travels/schedule');
    }
  }, [addressFrom, addressTo, router]);

  return (
    <>
      <div className={'flex'}>
        <GoogleMapView
          apiKey={googleMapsApiKey}
          zoom={3}
          center={{
            lat: 20.566646720860327,
            lng: -103.22860101349919,
          }}
          style={{
            height: '100vh',
          }}
        >
          <GoogleRouting
            origin={addressTo}
            destination={addressFrom}
            catchNotFoundRoute={catchNotFoundRoute}
          />
        </GoogleMapView>
      </div>
    </>
  );
}

export default PreviewScheduleTravel;
