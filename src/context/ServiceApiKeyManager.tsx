import React, { createContext, PropsWithChildren, useContext } from 'react';
import { atom, useAtom } from 'jotai';

const defaultGoogleAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;
const defaultGoogleManagementMapsAPIKey = import.meta.env
  .VITE_GOOGLE_MANAGEMENT_API;
const defaultGoogleMapStyle = import.meta.env.VITE_GOOGLE_MAP_STYLE;

interface ServiceApiProps {
  googleApiKey: string;
  googleManagementMapApiKey: string;
}

const ServiceApi = createContext<ServiceApiProps>({
  googleApiKey: '',
  googleManagementMapApiKey: '',
});

const googleMapApiKeyAtom = atom<string>(defaultGoogleAPIKey);
const googleManagementMapsApiKeyAtom = atom<string>(
  defaultGoogleManagementMapsAPIKey,
);

export const ServiceApiKeyProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [googleApiKey] = useAtom(googleMapApiKeyAtom);
  const [googleManagementMapApiKey] = useAtom(googleManagementMapsApiKeyAtom);

  const props: ServiceApiProps = {
    googleApiKey: googleApiKey,
    googleManagementMapApiKey: googleManagementMapApiKey,
  };

  return <ServiceApi.Provider value={props}>{children}</ServiceApi.Provider>;
};

export const useServiceApiManager = () => {
  return useContext(ServiceApi);
};
