import { DateTime } from 'luxon';
import { Page } from './page.model';

export class TaskExecution {

  executionId: number;
  exitCode: number;
  taskName: string;
  startTime: DateTime;
  endTime: DateTime;
  exitMessage: string;
  arguments: string[];
  jobExecutionIds: number[];
  errorMessage: string;
  externalExecutionId: string;
  taskExecutionStatus: string;
  parentExecutionId: number;
  resourceUrl: string;
  appProperties: object;
  deploymentProperties: object;

  static parse(input) {
    const execution = new TaskExecution();
    execution.executionId = input?.executionId;
    execution.exitCode = input?.exitCode;
    execution.taskName = input?.taskName;
    execution.startTime = input?.startTime;
    execution.endTime = input?.endTime;
    execution.exitMessage = input?.exitMessage;
    execution.arguments = input?.args;
    execution.jobExecutionIds = input?.jobExecutionIds;
    execution.errorMessage = input?.errorMessage;
    execution.taskExecutionStatus = input?.taskExecutionStatus;
    execution.externalExecutionId = input?.externalExecutionId;
    execution.parentExecutionId = input?.parentExecutionId;
    execution.resourceUrl = input?.resourceUrl;
    execution.appProperties = input?.appProperties;
    execution.deploymentProperties = input?.deploymentProperties;
    return execution;
  }
}

export class TaskExecutionPage extends Page<TaskExecution> {
  static parse(input): Page<TaskExecution> {
    const page = Page.fromJSON<TaskExecution>(input);
    if (input && input._embedded && input._embedded.taskExecutionResourceList) {
      page.items = input._embedded.taskExecutionResourceList.map(TaskExecution.parse);
    }
    return page;
  }
}
