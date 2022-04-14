import {Observable} from "rxjs";

export interface Crud<IN, OUT> {
  insert(input: IN): Observable<OUT>

  update(id: number, input: IN): Observable<OUT>

  select(index: number, size: number): Observable<PageResult<OUT>>

  delete(id: number): Observable<CrudDeleteResult>
}

export interface PageResult<T> {
  data: Array<T>
  pageIndex: number
  pageCount: number
  size: number
}

export interface CrudDeleteResult {
  "data": boolean
}
