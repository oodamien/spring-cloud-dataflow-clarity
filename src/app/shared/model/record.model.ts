import { DateTime } from 'luxon';
import { Page } from './page.model';

export class Record {

  auditRecordId: number;
  createdBy: string;
  correlationId: string;
  auditData: string;
  createdOn: DateTime;
  auditAction: string;
  auditOperation: string;
  platformName: string;

  auditActionColor: string;

  static parse(input) {
    const record = new Record();
    record.auditRecordId = input.auditRecordId;
    record.createdBy = input.createdBy;
    record.correlationId = input.correlationId;
    record.auditData = input.auditData;
    record.createdOn = DateTime.fromISO(input.createdOn);
    record.auditAction = input.auditAction;
    record.auditOperation = input.auditOperation;
    record.platformName = input.platformName;
    switch (record.auditAction) {
      case 'CREATE':
        record.auditActionColor = 'success';
        break;
      case 'DELETE':
        record.auditActionColor = 'danger';
        break;
      default:
        record.auditActionColor = 'info';
    }
    return record;
  }
}

export class RecordPage extends Page<Record> {
  static parse(input): Page<Record> {
    const page = Page.fromJSON<Record>(input);
    if (input && input._embedded && input._embedded.auditRecordResourceList) {
      page.items = input._embedded.auditRecordResourceList.map(Record.parse);
    }
    return page;
  }
}

export class RecordActionType {
  id: number;
  key: string;
  name: string;

  static parse(input) {
    const recordActionType = new RecordActionType();
    recordActionType.id = input.id;
    recordActionType.key = input.key;
    recordActionType.name = input.name;
    return recordActionType;
  }
}

export class RecordOperationType {
  id: number;
  key: string;
  name: string;

  static parse(input) {
    const recordOperationType = new RecordOperationType();
    recordOperationType.id = input.id;
    recordOperationType.key = input.key;
    recordOperationType.name = input.name;
    return recordOperationType;
  }
}
