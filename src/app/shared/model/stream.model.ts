import { Page } from './page.model';

export class Stream {
  public name: string;
  public dslText: string;
  public description: string;
  public originalDslText: string;
  public status: string;
  public deploymentProperties: any;

  public static parse(input): Stream {
    const stream = new Stream();
    stream.name = input?.name;
    stream.dslText = input?.dslText;
    stream.originalDslText = input?.originalDslText;
    stream.description = input?.escription ? input?.description : '';
    stream.status = input?.status?.toUpperCase();
    if (input.deploymentProperties && input.deploymentProperties.length > 0) {
      stream.deploymentProperties = JSON.parse(input.deploymentProperties);
    }
    return stream;
  }

  statusColor() {
    switch (this.status) {
      case 'UNDEPLOYED':
        return '';
      case 'DEPLOYED':
        return 'success';
      case 'DEPLOYING':
        return 'warning';
      case 'ERROR':
      case 'FAILED':
        return 'danger';
      default:
        return 'info';
    }
  }
}

export class StreamPage extends Page<Stream> {
  public static parse(input): Page<Stream> {
    const page = Page.fromJSON<Stream>(input);
    if (input && input._embedded && input._embedded.streamDefinitionResourceList) {
      page.items = input._embedded.streamDefinitionResourceList.map(Stream.parse);
    }
    return page;
  }
}
