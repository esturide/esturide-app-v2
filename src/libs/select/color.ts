import UserRole from '$libs/types/UserRole.ts';
import ColorTheme from '$libs/types/Theme.ts';

export const roleOptions: UserRole[] = [
  'not-verified',
  'passenger',
  'driver',
  'staff',
  'admin',
] as const;

export const searchRoleFromList = (role: UserRole): number => {
  for (let i = 0; i < roleOptions.length; i++) {
    if (roleOptions[i] == role) {
      return i;
    }
  }

  return 0;
};

export const selectThemeFromRole = (role: UserRole): ColorTheme => {
  if (role === 'driver') {
    return 'teal';
  } else if (role === 'passenger') {
    return 'indigo';
  }

  return 'gray';
};
