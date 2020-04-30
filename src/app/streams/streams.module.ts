import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { RuntimeComponent } from './runtime/runtime.component';
import { StreamsComponent } from './streams/streams.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './runtime/details/details.component';


@NgModule({
  declarations: [
    RuntimeComponent,
    StreamsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    SharedModule,
    StreamsRoutingModule
  ]
})
export class StreamsModule { }
