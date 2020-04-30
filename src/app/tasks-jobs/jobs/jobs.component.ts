import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../shared/api/job.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { JobExecution, JobExecutionPage } from '../../shared/model/job.model';
import { Task, TaskPage } from '../../shared/model/task.model';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../shared/component/confirm/confirm.component';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
})
export class JobsComponent {

    loading = true;
    page: JobExecutionPage;
    state: ClrDatagridStateInterface;
    selection: JobExecution;
    @ViewChild('restartModal', { static: true }) restartModal: ConfirmComponent;
    @ViewChild('stopModal', { static: true }) stopModal: ConfirmComponent;

    constructor(private jobService: JobService,
                private router: Router,
                private notificationService: NotificationService) {
    }

    refresh(state: ClrDatagridStateInterface) {
        this.state = state;
        this.loading = true;
        this.jobService.getExecutions(this.state.page.current - 1, this.state.page.size)
            .subscribe((page: JobExecutionPage) => {
                this.page = page;
                this.loading = false;
            });
    }

    details(execution: JobExecution) {
        this.router.navigateByUrl(`tasks-jobs/job-executions/${execution.jobExecutionId}`);
    }

    restart(execution: JobExecution) {
        this.selection = execution;
        this.restartModal.open();
    }

    restartJob() {
        this.jobService.restart(this.selection)
            .subscribe(() => {
              this.notificationService.success('Restart job', `Successfully restarted job "${this.selection.name}"`);
            }, error => {
              this.notificationService.error('An error occurred', error);
            });
    }

    stop(execution: JobExecution) {
        this.selection = execution;
        this.stopModal.open();
    }

    stopJob() {
        this.jobService.stop(this.selection)
            .subscribe(() => {
              this.notificationService.success('Stop job', `Successfully stopped job "${this.selection.name}"`);
            }, error => {
              this.notificationService.error('An error occurred', error);
            });
    }
}
