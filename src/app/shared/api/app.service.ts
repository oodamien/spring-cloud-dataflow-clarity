import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtils } from '../support/http.utils';
import { forkJoin, Observable } from 'rxjs';
import { App, ApplicationType, AppPage } from '../model/app.model';
import { map } from 'rxjs/operators';
import { DetailedApp } from '../model/detailed-app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {
  }

  public getApps(page: number, size: number, search?: string, type?: ApplicationType, sort?: string, order?: string): Observable<AppPage> {
    let params = HttpUtils.getPaginationParams(page, size);
    const headers = HttpUtils.getDefaultHttpHeaders();
    if (sort && order) {
      params = params.append('sort', `${sort},${order}`);
    }
    if (search) {
      params = params.append('search', search);
    }
    if (type) {
      params = params.append('type', type.toString());
    }
    return this.httpClient
      .get('/apps', { headers, params })
      .pipe(
        map(AppPage.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  getApp(name: string, type: ApplicationType, appVersion?: string): Observable<DetailedApp> {
    const httpHeaders = HttpUtils.getDefaultHttpHeaders();
    let url = `/apps/${type}/${name}`;
    if (appVersion) {
      url = `/apps/${type}/${name}/${appVersion}`;
    }
    return this.httpClient.get(url, { headers: httpHeaders })
      .pipe(
        map(DetailedApp.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  getAppVersions(name: string, type: ApplicationType): Observable<App[]> {
    return this.getApps(0, 10000, name, type)
      .pipe(map((app: AppPage): App[] => {
        return app.items
          .filter((a) => (a.name === name && a.type === type))
          .sort((a, b) => a.version < b.version ? -1 : 1);
      }));
  }

  unregisterApp(app: App): Observable<any> {
    const httpHeaders = HttpUtils.getDefaultHttpHeaders();
    let url = `/apps/${app.type}/${app.name}`;
    if (app.version) {
      url = `${url}/${app.version}`;
    }
    return this.httpClient
      .delete(url, { headers: httpHeaders });
  }

  unregisterApps(apps: App[]): Observable<any[]> {
    return forkJoin(apps.map(app => this.unregisterApp(app)));
  }
}
