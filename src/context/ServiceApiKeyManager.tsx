import React, { createContext, PropsWithChildren, useContext } from 'react';
import { atom, useAtom } from 'jotai';

const defaultGoogleAPIKey = import.meta.env.VITE_GOOGLE_MANAGEMENT_API_KEY;
const defaultGoogleMapsID = import.meta.env.VITE_GOOGLE_MAPS_ID;

interface ServiceApiProps {
  googleApiKey: string;
  googleMapsID: string;
}

const ServiceApi = createContext<ServiceApiProps>({
  googleApiKey: '',
  googleMapsID: '',
});

const googleMapApiKeyAtom = atom<string>(defaultGoogleAPIKey);
const googleMapsIDAtom = atom<string>(defaultGoogleMapsID);

export const ServiceApiKeyProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [googleApiKey] = useAtom(googleMapApiKeyAtom);
  const [googleMapsID] = useAtom(googleMapsIDAtom);

  const props: ServiceApiProps = {
    googleApiKey: googleApiKey,
    googleMapsID: googleMapsID,
  };

  return <ServiceApi.Provider value={props}>{children}</ServiceApi.Provider>;
};

export const useServiceApiManager = () => {
  return useContext(ServiceApi);
};
