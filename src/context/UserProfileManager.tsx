import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import UserProfileResponse from '$libs/request/response/UserProfileResponse.ts';
import { getCurrentUser } from '$libs/request/user.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import { atom, useAtom } from 'jotai';

interface Props {
  userProfile?: UserProfileResponse;
  userFound: boolean;
}

const UserProfile = createContext<Props>({
  userFound: false,
});

const userProfileAtom = atom<UserProfileResponse | undefined>(undefined);

export const UserProfileProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    const request = async () => {
      const status = await getCurrentUser(getRequestRoot(), setUserProfile);

      if (!status) {
        setUserProfile(undefined);
      }

      setUserFound(status);
    };

    request();

    return () => {
      setUserProfile(undefined);
      setUserFound(false);
    };
  }, []);

  const props: Props = {
    userProfile: userProfile,
    userFound: userFound,
  };

  return <UserProfile.Provider value={props}>{children}</UserProfile.Provider>;
};

export const useUserProfile = () => {
  return useContext(UserProfile);
};
