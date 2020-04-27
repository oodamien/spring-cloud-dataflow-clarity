import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuntimeComponent } from './runtime/runtime.component';
import { StreamsComponent } from './streams/streams.component';

const routes: Routes = [
  {
    path: 'streams/list',
    component: StreamsComponent,
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
