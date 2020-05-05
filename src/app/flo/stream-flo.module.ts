import { NgModule } from '@angular/core';
import { GraphViewComponent } from './shared/graph-view/graph-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { DocService } from './shared/service/doc.service';
import { MessageRateComponent } from './stream/message-rate/message-rate.component';
import { PropertiesDialogComponent } from './shared/properties/properties-dialog.component';
import { PropertiesGroupsDialogComponent } from './shared/properties-groups/properties-groups-dialog.component';
import { InstanceDotComponent } from './stream/instance-dot/instance-dot.component';
import { StreamNodeComponent } from './stream/node/stream-node.component';
import { StreamPropertiesDialogComponent } from './stream/properties/stream-properties-dialog.component';
import { EditorService } from './stream/editor.service';
import { MetamodelService } from './stream/metamodel.service';
import { RenderService } from './stream/render.service';
import { StreamFloViewComponent } from './stream/component/view.component';
import { FloModule } from 'spring-flo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ParserService } from './shared/service/parser.service';
import { StreamFloCreateComponent } from './stream/component/create.component';
import { ContentAssistService } from './stream/content-assist.service';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    GraphViewComponent,
    PropertiesDialogComponent,
    PropertiesGroupsDialogComponent,
    MessageRateComponent,
    InstanceDotComponent,
    StreamNodeComponent,
    StreamPropertiesDialogComponent,
    StreamFloViewComponent,
    StreamFloCreateComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    FloModule,
  ],
  providers: [
    DocService,
    EditorService,
    MetamodelService,
    RenderService,
    ParserService,
    ContentAssistService,
  ],
  exports: [
    StreamFloViewComponent,
    StreamFloCreateComponent
  ]
})

export class StreamFloModule {
}
