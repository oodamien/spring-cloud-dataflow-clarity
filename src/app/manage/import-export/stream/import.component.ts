import { Component } from '@angular/core';
import { NotificationService } from '../../../shared/service/notification.service';
import { ImportExportService } from '../../../shared/service/import-export.service';

@Component({
  selector: 'app-manage-stream-import',
  template: `
    <clr-modal [(clrModalOpen)]="isOpen" [clrModalClosable]="view !== 'loading'">
      <h3 class="modal-title">Import stream(s)</h3>
      <div class="modal-body" *ngIf="view === 'file'">
        <div>
          You can import your streams from a <strong>JSON file</strong>.<br/>
          The file needs to be modified for sensitive properties before importing.
        </div>
        <div class="form-group">
          <label>JSON file</label>
          <label class="control-file" for="file">
            <span class="filename">{{ file?.name }}</span>
            <span class="button">Select a file</span>
            <input name="file" id="file" type='file' (change)="fileChanged($event)">
          </label>
        </div>
        <div class="form-group form-group-options">
          <div class="options-title">
            <strong>Options:</strong>
          </div>
          <div>
            <label class="checkbox-inline">
              <input type="checkbox" [(ngModel)]="optimize"/>
              Optimize the import (sort)
            </label>
          </div>
        </div>
      </div>
      <div class="modal-body" *ngIf="view === 'result'">
        <div>
          File: <strong>{{ file?.name }}</strong><br/>
          Duration: <strong>{{ result.duration }}s</strong>
        </div>
        <div *ngIf="result.error.length > 0">
          <h4>{{ result.error.length }} error(s)</h4>
          <table class="table  table-noborder table-compact">
            <tbody>
            <ng-container *ngFor="let stream of result.error; index as i">
              <tr class="error">
                <td width="10px" class="left">
                  ICON
                </td>
                <td class="left">
                  <div>
                    <strong>{{ stream.name }}</strong><br/>
                    <app-stream-dsl>{{ stream.dslText }}</app-stream-dsl>
                  </div>
                  <div class="error">
                    Message: {{ stream.message}}<br/>
                    Index: {{ i }}
                  </div>
                </td>
              </tr>
            </ng-container>
            </tbody>
          </table>
        </div>
        <div *ngIf="result.success.length > 0">
          <h4>{{ result.success.length }} stream(s) created</h4>
          <table class="table table-noborder table-compact">
            <tbody>
            <ng-container *ngFor="let stream of result.success; index as i">
              <tr class="created">
                <td width="10px" class="left">
                  ICON
                </td>
                <td class="left">
                  <strong>{{ stream.name }}</strong><br/>
                  <app-stream-dsl>{{ stream.dslText }}</app-stream-dsl>
                </td>
              </tr>
            </ng-container>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-body" *ngIf="view === 'importing'">
        <clr-spinner clrInline clrSmall></clr-spinner>
        Importing stream(s) ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" [disabled]="view === 'importing'" (click)="isOpen = false">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="run()" [disabled]="view === 'importing'">
          <span>Import stream(s)</span>
        </button>
      </div>
    </clr-modal>
  `
})
export class StreamImportComponent {
  isOpen = false;
  optimize = false;
  file: any;
  view = 'file';
  result = {
    success: [],
    error: [],
    duration: 0
  };

  constructor(private notificationService: NotificationService,
              private importExportService: ImportExportService) {
  }

  open() {
    this.isOpen = true;
  }

  fileChanged(event) {
    try {
      this.file = event.target.files[0];
    } catch (e) {
      this.file = null;
    }
  }

  run() {
    if (!this.file) {
      this.notificationService.error('Invalid file', 'Please, select a file.');
      return;
    }
    const date = new Date().getTime();
    this.view = 'importing';

    this.importExportService.streamsImport(this.file, this.optimize)
      .subscribe((result) => {
          this.result = {
            success: result.filter(item => item.created),
            error: result.filter(item => !item.created),
            duration: Math.round((new Date().getTime() - date) / 1000)
          };
          this.view = 'result';
        },
        () => {
          this.view = 'file';
          this.notificationService.error('Invalid file', 'The file is not valid.');
        });
  }

}
