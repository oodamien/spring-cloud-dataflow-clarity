import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { AppsComponent } from './apps/apps.component';
import { RecordsComponent } from './records/records.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { TypeFilterComponent } from './apps/type.filter';
import { AppComponent } from './apps/app/app.component';
import { UnregisterComponent } from './apps/unregister/unregister.component';
import { ActionFilterComponent } from './records/action.filter';
import { OperationFilterComponent } from './records/operation.filter';
import { DateFilterComponent } from './records/date.filter';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './apps/add/add.component';


@NgModule({
  declarations: [
    AppsComponent,
    RecordsComponent,
    ImportExportComponent,
    TypeFilterComponent,
    AppComponent,
    UnregisterComponent,
    ActionFilterComponent,
    OperationFilterComponent,
    DateFilterComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    FormsModule,
    SharedModule,
    ClarityModule
  ],
  providers: []
})
export class ManageModule {
}
