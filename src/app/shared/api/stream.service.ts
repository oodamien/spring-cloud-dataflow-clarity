import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpUtils } from '../support/http.utils';
import { catchError, delay, map } from 'rxjs/operators';
import { Stream, StreamPage } from '../model/stream.model';
import { forkJoin, Observable, timer } from 'rxjs';
import { ErrorUtils } from '../support/error.utils';
import { DataflowEncoder } from '../support/encoder.utils';

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

  getStreamsRelated(streamName: string, nested?: boolean): Observable<Stream[]> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    let params = new HttpParams();
    if (nested) {
      params = params.append('nested', nested.toString());
    }
    return this.httpClient
      .get<any>(`/streams/definitions/${streamName}/related`, { params, headers })
      .pipe(
        map(jsonResponse => StreamPage.parse(jsonResponse).items),
        catchError(ErrorUtils.catchError)
      );
  }

  getStream(name: string): Observable<Stream> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    return this.httpClient
      .get<any>(`/streams/definitions/${name}`, { headers })
      .pipe(
        map(Stream.parse),
        catchError(ErrorUtils.catchError)
      );
  }

  destroyStream(stream: Stream): Observable<any> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    const url = `/streams/definitions/${stream.name}`;
    return this.httpClient
      .delete(url, { headers })
      .pipe(
        catchError(ErrorUtils.catchError)
      );
  }

  destroyStreams(streams: Stream[]): Observable<any[]> {
    return forkJoin(streams.map(stream => this.destroyStream(stream)));
  }

  undeployStream(stream: Stream): Observable<HttpResponse<any>> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    return this.httpClient
      .delete<any>('/streams/deployments/' + stream.name, { headers })
      .pipe(
        catchError(ErrorUtils.catchError)
      );
  }

  createStream(name: string, dsl: string, description: string): Observable<any> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    const params = new HttpParams({ encoder: new DataflowEncoder() })
      .append('name', name)
      .append('definition', dsl)
      .append('description', description);
    return this.httpClient
      .post<any>('/streams/definitions/', null, { headers, observe: 'response', params })
      .pipe(
        catchError(ErrorUtils.catchError)
      );
  }

  undeployStreams(streams: Stream[]): Observable<HttpResponse<any>[]> {
    return forkJoin(streams.map(stream => this.undeployStream(stream)));
  }
}
