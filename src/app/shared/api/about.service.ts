import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorUtils } from '../support/error.utils';
import { About } from '../model/about.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private aboutSubject = new BehaviorSubject<About>(undefined);

  constructor(private httpClient: HttpClient) {
  }

  getAbout(): Observable<About> {
    return this.aboutSubject.asObservable();
  }

  load(): Observable<About> {
    this.httpClient
      .get<any>('/about')
      .pipe(
        map(About.parse),
        catchError(ErrorUtils.catchError)
      )
      .subscribe((about: About) => {
        this.aboutSubject.next(about);
      });
    return this.getAbout();
  }
}
