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
  version: string;
  defaultVersion: boolean;

  public static parse(input) {
    const app = new App();
    app.name = input.name;
    app.type = input.type as ApplicationType;
    app.uri = input.uri;
    app.version = input.version;
    app.defaultVersion = input.defaultVersion;
    return app;
  }

  typeColor() {
    switch (this.type.toString()) {
      case 'source':
        return 'info';
      case 'sink':
        return 'success';
      case 'processor':
        return 'danger';
      case 'task':
        return 'warning';
      default:
      case 'app':
        return 'purple';
    }
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
