import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskPage } from '../model/task.model';
import { forkJoin, Observable } from 'rxjs';
import { HttpUtils } from '../support/http.utils';
import { map } from 'rxjs/operators';
import { TaskExecution, TaskExecutionPage } from '../model/task-execution.model';
import { Platform, PlatformTaskList } from '../model/platform.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  getTasks(page: number, size: number, search?: string, sort?: string, order?: string): Observable<TaskPage> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    let params = HttpUtils.getPaginationParams(page, size);
    if (search) {
      params = params.append('search', search);
    }
    if (sort && order) {
      params = params.append('sort', `${sort},${order}`);
    }
    return this.httpClient
      .get<any>('/tasks/definitions', { headers, params })
      .pipe(
        map(TaskPage.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  getTask(name: string): Observable<Task> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    return this.httpClient
      .get<any>(`/tasks/definitions/${name}`, { headers })
      .pipe(
        map(Task.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  destroyTask(task: Task): Observable<any> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    return this.httpClient
      .delete('/tasks/definitions/' + task.name, { headers, observe: 'response' });
    // .pipe(
    //   catchError(this.errorHandler.handleError)
    // );
  }

  destroyTasks(tasks: Task[]): Observable<any[]> {
    return forkJoin(tasks.map(task => this.destroyTask(task)));
  }

  launch(taskName: string, args: string, props: string): Observable<any> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    let params = new HttpParams().append('name', taskName);
    if (args) {
      params = params.append('arguments', args);
    }
    if (props) {
      params = params.append('properties', props);
    }
    return this.httpClient
      .post('/tasks/executions', {}, { headers, params });
    // .pipe(
    //   catchError(this.errorHandler.handleError)
    // );
  }

  stop(taskExecution: TaskExecution): Observable<any> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    return this.httpClient
      .post<any>(`/tasks/executions/${taskExecution.executionId}`, { headers });
    // .pipe(
    //   catchError(this.errorHandler.handleError)
    // );
  }

  getExecutions(page: number, size: number, taskName?: string, sort?: string, order?: string): Observable<TaskExecutionPage> {
    let params = HttpUtils.getPaginationParams(page, size);
    const headers = HttpUtils.getDefaultHttpHeaders();
    if (taskName) {
      params = params.append('name', taskName);
    }
    if (sort && order) {
      params = params.append('sort', `${sort},${order}`);
    }
    return this.httpClient
      .get<any>('/tasks/executions', { headers, params })
      .pipe(
        map(TaskExecutionPage.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

  getPlatforms(): Observable<Platform[]> {
    const headers = HttpUtils.getDefaultHttpHeaders();
    const params = HttpUtils.getPaginationParams(0, 1000);
    return this.httpClient
      .get<any>('/tasks/platforms', { params, headers })
      .pipe(
        map(PlatformTaskList.parse),
        // catchError(this.errorHandler.handleError)
      );
  }

}
