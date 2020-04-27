import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecordActionType, RecordOperationType, RecordPage } from '../model/record.model';
import { HttpUtils } from '../support/http.utils';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private operationTypes: RecordOperationType[];

  private actionTypes: RecordActionType[];

  constructor(private httpClient: HttpClient) {
  }

  getRecords(page: number, size: number, search?: string, action?: string, operation?: string, fromDate?: DateTime, toDate?: DateTime,
             sort?: string, order?: string): Observable<RecordPage> {
    let params = HttpUtils.getPaginationParams(page, size);
    const headers = HttpUtils.getDefaultHttpHeaders();
    if (search) {
      params = params.append('search', search);
    }
    if (action) {
      params = params.append('actions', action);
    }
    if (operation) {
      params = params.append('operations', operation);
    }
    if (sort && order) {
      params = params.append('sort', `${sort},${order}`);
    }
    if (fromDate) {
      params = params.append('fromDate', fromDate.toISODate() + 'T00:00:00');
    }
    if (toDate) {
      params = params.append('toDate', toDate.toISODate() + 'T23:59:59');
    }
    return this.httpClient
      .get<any>('/audit-records', { params, headers })
      .pipe(
        map(RecordPage.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  getOperationTypes(): Observable<RecordOperationType[]> {
    if (this.operationTypes) {
      return of(this.operationTypes);
    }
    return this.httpClient
      .get<any>('/audit-records/audit-operation-types', { headers: HttpUtils.getDefaultHttpHeaders() })
      .pipe(
        map(response => {
          const operationTypes: RecordOperationType[] = response.map(RecordOperationType.parse);
          // this.auditOperationTypes$.next(auditOperationTypes);

          return operationTypes;
        }),
       // catchError(this.errorHandler.handleError)
      );
  }

  getActionTypes() {
    if (this.actionTypes) {
      return of(this.actionTypes);
    }
    return this.httpClient
      .get<any>('/audit-records/audit-action-types', { headers: HttpUtils.getDefaultHttpHeaders() })
      .pipe(
        map(response => {
          const actionTypes: RecordActionType[] = response.map(RecordActionType.parse);
          return actionTypes;
        }),
        // catchError(this.errorHandler.handleError)
      );
  }

}
