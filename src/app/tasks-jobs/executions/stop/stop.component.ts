import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskExecution } from '../../../shared/model/task-execution.model';
import { TaskService } from '../../../shared/api/task.service';

@Component({
  selector: 'app-execution-stop',
  templateUrl: './stop.component.html'
})
export class StopComponent {

  isOpen = false;
  execution: TaskExecution;
  @Output() onStopped = new EventEmitter();

  constructor(private taskService: TaskService) {
  }

  open(execution: TaskExecution) {
    this.execution = execution;
    this.isOpen = true;
  }

  stop() {
    this.taskService.stop(this.execution)
      .subscribe(
        data => {
          // this.notificationService.success(`${data.length} app(s) unregistered.`);
          this.onStopped.emit(data);
          this.isOpen = false;
          this.execution = null;
        }, error => {
          // this.notificationService.error(AppError.is(error) ? error.getMessage() : error);
          this.isOpen = false;
          this.execution = null;
        });
  }

}
