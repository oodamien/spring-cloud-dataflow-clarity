import { Component, OnInit, ViewChild } from '@angular/core';
import { StreamExportComponent } from './stream/export.component';
import { StreamImportComponent } from './stream/import.component';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.sass']
})
export class ImportExportComponent implements OnInit {
  @ViewChild('streamImportModal', { static: true }) streamImportModal: StreamImportComponent;
  @ViewChild('streamExportModal', { static: true }) streamExportModal: StreamExportComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  run(type: string) {
    switch (type) {
      case 'import-stream':
        this.streamImportModal.open();
        break;
      case 'export-stream':
        this.streamExportModal.open()
        break;
    }
    return false;
  }

}
