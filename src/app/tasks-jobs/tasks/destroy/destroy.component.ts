import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../../shared/api/task.service';
import { Task } from '../../../shared/model/task.model';

@Component({
  selector: 'app-task-destroy',
  templateUrl: './destroy.component.html'
})
export class DestroyComponent {

  tasks: Task[];
  isOpen = false;
  @Output() onDestroyed = new EventEmitter();

  constructor(private taskService: TaskService) {
  }

  open(tasks: Task[]) {
    this.tasks = tasks;
    this.isOpen = true;
  }

  destroy() {
    this.taskService.destroyTasks(this.tasks)
      .subscribe(
        data => {
          if (data.length === 1) {
            // this.notificationService.success('Successfully removed app "'
            //   + this.applications[0].name + '" of type "' + this.applications[0].type.toString() + '".');
          } else {
            // this.notificationService.success(`${data.length} app(s) unregistered.`);
          }
          this.onDestroyed.emit(data);
          this.isOpen = false;
          this.tasks = null;
        }, error => {
          // this.notificationService.error(AppError.is(error) ? error.getMessage() : error);
          this.isOpen = false;
          this.tasks = null;
        });
  }

}
