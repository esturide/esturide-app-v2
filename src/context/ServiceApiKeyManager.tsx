import React, { createContext, PropsWithChildren, useContext } from 'react';
import { atom, useAtom } from 'jotai';

const defaultGoogleAPIKey = import.meta.env.VITE_GOOGLE_MANAGEMENT_API_KEY;

interface ServiceApiProps {
  googleApiKey: string;
}

const ServiceApi = createContext<ServiceApiProps>({
  googleApiKey: '',
});

const googleMapApiKeyAtom = atom<string>(defaultGoogleAPIKey);

export const ServiceApiKeyProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [googleApiKey] = useAtom(googleMapApiKeyAtom);

  const props: ServiceApiProps = {
    googleApiKey: googleApiKey,
  };

  return <ServiceApi.Provider value={props}>{children}</ServiceApi.Provider>;
};

export const useServiceApiManager = () => {
  return useContext(ServiceApi);
};
