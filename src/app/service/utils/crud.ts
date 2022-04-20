import {Observable} from "rxjs";

export interface Crud<IN, OUT,ID> {
  insert(input: IN): Observable<OUT>

  update(id: ID, input: IN): Observable<OUT>

  select(index: number, size: number): Observable<PageResult<OUT>>

  delete(id: ID): Observable<CrudDeleteResult>
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
