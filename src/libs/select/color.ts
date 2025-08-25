import UserRole from '$libs/types/UserRole.ts';
import ColorTheme from '$libs/types/Theme.ts';

const selectThemeFromRole = (role: UserRole): ColorTheme => {
  if (role === 'driver') {
    return 'teal';
  } else if (role === 'passenger') {
    return 'indigo';
  }

  return 'gray';
};

export default selectThemeFromRole;
