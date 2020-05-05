import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StreamService } from '../../../shared/api/stream.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { MetamodelService } from '../metamodel.service';
import { RenderService } from '../render.service';

@Component({
  selector: 'app-stream-flo-view',
  styleUrls: [
    '../../../../../node_modules/spring-flo/dist/flo.css',
    '../../shared/flo.scss'
  ],
  template: `
    <div *ngIf="dsl">
      <app-graph-view [dsl]="dsl" [paperPadding]="40" class="stream-details" [metamodel]="metamodelService" [renderer]="renderService">
      </app-graph-view>
    </div>
  `
})
export class StreamFloViewComponent implements OnDestroy, AfterContentInit {
  @Input() id: string;
  @Input() dsl = '';
  @Input() nested = true;

  constructor(private streamService: StreamService,
              private notificationService: NotificationService,
              public metamodelService: MetamodelService,
              public renderService: RenderService) {
  }

  ngAfterContentInit() {
    this.metamodelService.clearCachedData();
    if (this.nested) {
      this.streamService
        .getStreamsRelated(this.id, true)
        .subscribe(streams => {
          console.log(streams);
          this.dsl = streams.map(s => `${s.name}=${s.dslText}`).join('\n');
        }, (error) => {
          this.notificationService.error(`An error occured`, error);
        });
    } else {
      this.streamService
        .getStream(this.id)
        .subscribe(stream => {
          this.dsl = stream.dslText;
        }, (error) => {
          this.notificationService.error(`An error occured`, error);
        });
    }
  }

  ngOnDestroy() {
    this.metamodelService.clearCachedData();
  }

}
