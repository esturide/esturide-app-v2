interface ScheduleFilterRequest {
  readonly terminate: boolean;
  readonly cancel: boolean;
  readonly starting?: Date;
  readonly terminated?: Date;
  readonly minPrice: number;
  readonly maxPrice?: number;
  readonly limit: number;
}

export default ScheduleFilterRequest;
