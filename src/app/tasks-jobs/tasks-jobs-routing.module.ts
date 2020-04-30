import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { JobsComponent } from './jobs/jobs.component';
import { ExecutionsComponent } from './executions/executions.component';
import { TaskComponent } from './tasks/task/task.component';
import { LaunchComponent } from './tasks/launch/launch.component';
import { ExecutionComponent } from './executions/execution/execution.component';
import { ExecutionComponent as JobExecutionComponent } from './jobs/execution/execution.component';
import { StepComponent } from './jobs/step/step.component';

const routes: Routes = [
  {
    path: 'tasks-jobs/tasks',
    component: TasksComponent
  },
  {
    path: 'tasks-jobs/tasks/:name',
    component: TaskComponent
  },
  {
    path: 'tasks-jobs/tasks/:name/launch',
    component: LaunchComponent
  },
  {
    path: 'tasks-jobs/task-executions',
    component: ExecutionsComponent
  },
  {
    path: 'tasks-jobs/task-executions/:executionId',
    component: ExecutionComponent
  },
  {
    path: 'tasks-jobs/job-executions',
    component: JobsComponent
  },
  {
    path: 'tasks-jobs/job-executions/:executionId',
    component: JobExecutionComponent
  },
  {
    path: 'tasks-jobs/job-executions/:executionId/:stepId',
    component: StepComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksJobsRoutingModule { }
