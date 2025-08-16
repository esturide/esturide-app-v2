import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import ColorTheme from '$libs/types/Theme.ts';

interface ThemeProps {
  theme: ColorTheme;
  setTheme: (color: ColorTheme) => void;
}

const UserTheme = createContext<ThemeProps>({
  theme: 'gray',
  setTheme: (color: ColorTheme) => {},
});

export const UserThemeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ColorTheme>('gray');

  const props: ThemeProps = {
    theme: theme,
    setTheme: setTheme,
  };

  return <UserTheme.Provider value={props}>{children}</UserTheme.Provider>;
};

export const useUserTheme = () => {
  return useContext(UserTheme);
};
