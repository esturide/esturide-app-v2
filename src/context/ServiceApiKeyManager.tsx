import React, { createContext, PropsWithChildren, useContext } from 'react';
import { atom, useAtom } from 'jotai';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface ServiceApiProps {
  googleApiKey: string;
}

const ServiceApi = createContext<ServiceApiProps>({
  googleApiKey: '',
});

const googleAtom = atom<string>(googleMapsApiKey);

export const ServiceApiKeyProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [googleApiKey] = useAtom(googleAtom);

  const props: ServiceApiProps = {
    googleApiKey: googleApiKey,
  };

  return <ServiceApi.Provider value={props}>{children}</ServiceApi.Provider>;
};

export const useServiceApiManager = () => {
  return useContext(ServiceApi);
};
