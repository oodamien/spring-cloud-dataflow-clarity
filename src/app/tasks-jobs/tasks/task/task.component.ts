import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../shared/api/task.service';
import { Task } from '../../../shared/model/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { DestroyComponent } from '../destroy/destroy.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  loading = true;
  task: Task;
  @ViewChild('destroyModal', { static: true }) destroyModal: DestroyComponent;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap(
          val => {
            this.task = new Task();
            this.task.name = val.name;
            return this.taskService.getTask(val.name);
          }
        ),
      )
      .subscribe((task: Task) => {
        this.task = task;
        this.loading = false;
      });
  }

  destroy() {
    this.destroyModal.open([this.task]);
  }

  launch() {
    this.router.navigateByUrl(`tasks-jobs/tasks/${this.task.name}/launch`);
  }

  back() {
    this.router.navigateByUrl('tasks-jobs/tasks');
  }

}
