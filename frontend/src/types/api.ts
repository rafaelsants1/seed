export interface ApiSuccess<T> {
  data: T;
  error: null;
  status: number;
}

export interface ApiError {
  data: null;
  error: string;
  status: number;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
