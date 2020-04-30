import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtils } from '../support/http.utils';
import { catchError, map } from 'rxjs/operators';
import { Stream, StreamPage } from '../model/stream.model';
import { Observable } from 'rxjs';
import { ErrorUtils } from '../support/error.utils';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private httpClient: HttpClient) {
  }

  getStreams(page: number, size: number, search?: string, sort?: string, order?: string): Observable<StreamPage> {
    let params = HttpUtils.getPaginationParams(page, size);
    const headers = HttpUtils.getDefaultHttpHeaders();
    if (search) {
      params = params.append('search', search);
    }
    if (sort && order) {
      params = params.append('sort', `${sort},${order}`);
    }
    return this.httpClient
      .get<any>('/streams/definitions', { params, headers })
      .pipe(
        map(StreamPage.parse),
        catchError(ErrorUtils.catchError)
      );
  }
}
