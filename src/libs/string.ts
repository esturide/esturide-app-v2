import { all } from '$libs/functional.ts';

export const noEmptyStrings = (allStrings: string[]) => {
  return all(allStrings, d => d.length > 0);
};
