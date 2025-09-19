import { atom } from 'jotai';
import defaultLocationList, {
  LocationOption,
} from '$libs/const/defaultLocations.ts';

export const addressAtom = atom('');
export const locationOptionAtom = atom<LocationOption>(defaultLocationList[0]);
export const swapTravelAtom = atom(false);
