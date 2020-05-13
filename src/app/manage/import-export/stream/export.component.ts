import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-stream-export',
  template: `
    <clr-modal [(clrModalOpen)]="isOpen" [clrModalClosable]="!isRunning">
      <h3 class="modal-title">Export stream(s)</h3>
      <div class="modal-body" *ngIf="!isRunning">
        Lorem
      </div>
      <div class="modal-body" *ngIf="isRunning">
        <clr-spinner clrInline clrSmall></clr-spinner>
        Exporting stream(s) ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" [disabled]="isRunning" (click)="isOpen = false">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="run()" [disabled]="isRunning">
          <span>Export stream(s)</span>
        </button>
      </div>
    </clr-modal>
  `
})
export class StreamExportComponent {

  isOpen = false;
  isRunning = false;

  constructor() {
  }

  open() {
    this.isOpen = true;
  }

  run() {
  }

}
