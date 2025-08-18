type StatusResponse = 'success' | 'failure';

export interface Index {
  status: StatusResponse;
}

export interface ResponseData<T> extends Index {
  data: T;
}

export interface ResponseMessage extends Index {
  message: string;
}
