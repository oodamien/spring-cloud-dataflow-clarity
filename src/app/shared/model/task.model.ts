import { Page } from './page.model';

export class Task {
  public name: string;
  public description: string;
  public dslText: string;
  public composed: boolean;
  public status: string;
  public statusColor: string;

  static parse(input) {
    const task = new Task();
    task.name = input.name;
    task.dslText = input.dslText;
    task.composed = input.composed;
    task.status = input.status;
    task.description = input.description || '';
    switch (task.status) {
      case 'SUCCESS':
        task.statusColor = 'success';
        break;
      case 'ERROR':
        task.statusColor = 'danger';
        break;
      default:
        task.statusColor = 'info';
    }
    return task;
  }
}

export class TaskPage extends Page<Task> {
  public static parse(input): Page<Task> {
    const page = Page.fromJSON<Task>(input);
    if (input && input._embedded && input._embedded.taskDefinitionResourceList) {
      page.items = input._embedded.taskDefinitionResourceList.map(Task.parse);
    }
    return page;
  }
}
