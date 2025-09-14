interface ValueState<T> {
  readonly state: boolean;
  readonly value?: T;
}

export default ValueState;
