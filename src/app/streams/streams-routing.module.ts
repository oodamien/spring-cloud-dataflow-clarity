import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuntimeComponent } from './runtime/runtime.component';
import { StreamsComponent } from './streams/streams.component';
import { StreamComponent } from './streams/stream/stream.component';
import { CreateComponent } from './streams/create/create.component';
import { DeployComponent } from './streams/deploy/deploy.component';

const routes: Routes = [
  {
    path: 'streams/list',
    component: StreamsComponent,
  },
  {
    path: 'streams/list/create',
    component: CreateComponent,
  },
  {
    path: 'streams/list/:name',
    component: StreamComponent,
  },
  {
    path: 'streams/list/:name/deploy',
    component: DeployComponent,
  },
  {
    path: 'streams/runtime',
    component: RuntimeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
