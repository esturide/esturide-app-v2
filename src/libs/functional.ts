export function all<T>(
  iterable: T[],
  predicate: (item: T) => boolean,
): boolean {
  for (const item of iterable) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
}

export function any<T>(iterable: T[], predicate: (item: T) => boolean) {
  for (const item of iterable) {
    if (predicate(item)) {
      return true;
    }
  }

  return false;
}
