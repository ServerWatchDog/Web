export interface InHttp {
  get<T>(path: string, result: (data: T) => void,
         error: (code: number, message: string) => void): void

  post<T>(path: string, data: object, result: (data: T) => void,
          error: (code: number, message: string) => void
  ): void

  put<T>(path: string, data: object, result: (data: T) => void,
         error: (code: number, message: string) => void): void

  delete<T>(path: string, result: (data: T) => void,
            error: (code: number, message: string) => void): void
}
