import { Page } from './page.model';

export enum ApplicationType {
  app,
  source,
  processor,
  sink,
  task
}

export class App {
  name: string;
  type: ApplicationType;
  uri: string;
  metaDataUri: string;
  typeColor: string;
  version: string;
  defaultVersion: boolean;

  public static parse(input) {
    const app = new App();
    app.name = input.name;
    app.type = input.type as ApplicationType;
    app.uri = input.uri;
    app.version = input.version;
    app.defaultVersion = input.defaultVersion;
    switch (app.type.toString()) {
      case 'source':
        app.typeColor = 'info';
        break;
      case 'sink':
        app.typeColor = 'success';
        break;
      case 'processor':
        app.typeColor = 'danger';
        break;
      case 'task':
        app.typeColor = 'warning';
        break;
      default:
      case 'app':
        app.typeColor = 'purple';
        break;
    }
    return app;
  }
}

export class AppPage extends Page<App> {
  public static parse(input): Page<App> {
    const page = Page.fromJSON<App>(input);
    if (input && input._embedded && input._embedded.appRegistrationResourceList) {
      page.items = input._embedded.appRegistrationResourceList.map(App.parse);
    }
    return page;
  }
}
