const conditionState = <T>(state: boolean, a: T, b: T) => {
  if (state) {
    return a;
  } else {
    return b;
  }
};

export default conditionState;
