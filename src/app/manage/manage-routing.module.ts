import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './apps/apps.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { RecordsComponent } from './records/records.component';
import { AppComponent } from './apps/app/app.component';

const routes: Routes = [
  {
    path: 'manage/apps',
    component: AppsComponent,
  },
  {
    path: 'manage/apps/:appType/:appName',
    component: AppComponent,
  },
  {
    path: 'manage/import-export',
    component: ImportExportComponent,
  },
  {
    path: 'manage/records',
    component: RecordsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
