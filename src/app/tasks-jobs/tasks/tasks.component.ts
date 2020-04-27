import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../shared/model/task.model';
import { ClrDatagridStateInterface } from '@clr/angular';
import { TaskPage } from '../../shared/model/task.model';
import { TaskService } from '../../shared/api/task.service';
import { DestroyComponent } from './destroy/destroy.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {

  loading = true;
  page: TaskPage;
  selected = [];
  grouped = false;
  state: ClrDatagridStateInterface;
  @ViewChild('destroyModal', { static: true }) destroyModal: DestroyComponent;

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.loading = true;
    this.grouped = false;
    const filters: { [prop: string]: any } = {};
    if (this.state.filters) {
      for (const filter of this.state.filters) {
        const { property, value } = filter;
        filters[property] = value;
      }
    }
    this.taskService.getTasks(this.state.page.current - 1, this.state.page.size, filters?.taskName || '',
      `${this.state?.sort?.by || ''}`, `${this.state?.sort?.reverse ? 'DESC' : 'ASC'}`)
      .subscribe((page: TaskPage) => {
        this.page = page;
        this.selected = [];
        this.loading = false;
      });
  }

  details(task: Task) {
    this.router.navigateByUrl(`tasks-jobs/tasks/${task.name}`);
  }

  launch(task: Task) {
    this.router.navigateByUrl(`tasks-jobs/tasks/${task.name}/launch`);
  }

  setMode(grouped: boolean) {
    this.grouped = grouped;
    this.selected = [];
  }

  destroyTasks(tasks: Task[]) {
    this.destroyModal.open(tasks);
  }
}
