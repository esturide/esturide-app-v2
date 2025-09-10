import { StringOption } from '@components/input/selector/SelectOptions.tsx';
import { LatLng } from '$libs/types/LatLng.ts';

export interface LocationOption extends StringOption {
  location: LatLng;
}

export const searchCurrentItem = (index: number) => {
  for (const item of defaultLocationList) {
    if (item.id == index) {
      return item;
    }
  }
};

const defaultLocationList: LocationOption[] = [
  {
    id: 0,
    description: 'CUTONALA',
    location: {
      lat: 20.56680439042432,
      lng: -103.22286936854996,
    },
  },
  {
    id: 1,
    description: 'CUCEI',
    location: {
      lat: 20.659772643172136,
      lng: -103.32453742113104,
    },
  },
  {
    id: 3,
    description: 'CUAAD',
    location: {
      lat: 20.73926734516559,
      lng: -103.31177341496343,
    },
  },
  {
    id: 4,
    description: 'CUCSH',
    location: {
      lat: 20.738665021477242,
      lng: -103.37846536266854,
    },
  },
  {
    id: 5,
    description: 'GUGDL',
    location: {
      lat: 20.694282978877933,
      lng: -103.35005580270655,
    },
  },
  {
    id: 6,
    description: 'CUCBA',
    location: {
      lat: 20.747260897834302,
      lng: -103.5127255548985,
    },
  },
  {
    id: 7,
    description: 'CUTLAJO',
    location: {
      lat: 20.465505894192166,
      lng: -103.41401115900983,
    },
  },
  {
    id: 8,
    description: 'CUCEA',
    location: {
      lat: 20.739605446415595,
      lng: -103.38183220518847,
    },
  },
] as const;

export default defaultLocationList;
