import Cookies from 'js-cookie';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

interface CookieOptions {
  expires?: number | Date;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

function createCookieStorage<T>(options?: CookieOptions): AsyncStorage<T> {
  return {
    getItem: async (key: string, initialValue: T) => {
      const value = Cookies.get(key);

      if (value === undefined) {
        return initialValue;
      }

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },

    setItem: async (key: string, value: T) => {
      const expires =
        options?.expires instanceof Date
          ? options.expires
          : options?.expires
            ? new Date(Date.now() + options.expires * 1000)
            : undefined;

      const cookieOptions: Cookies.CookieAttributes = {
        ...options,
        expires: expires,
        secure: true,
        sameSite: 'lax',
        path: options?.path || '/',
      };

      if (typeof value === 'string') {
        Cookies.set(key, value, cookieOptions);
      } else {
        Cookies.set(key, JSON.stringify(value), cookieOptions);
      }
    },

    removeItem: async (key: string) => {
      Cookies.remove(key);
    },
  };
}

export default createCookieStorage;
