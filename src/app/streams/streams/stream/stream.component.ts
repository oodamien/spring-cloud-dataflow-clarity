import { Component, OnInit, ViewChild } from '@angular/core';
import { Stream } from '../../../shared/model/stream.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StreamService } from '../../../shared/api/stream.service';
import { mergeMap } from 'rxjs/operators';
import { HttpError } from '../../../shared/model/error.model';
import { NotificationService } from '../../../shared/service/notification.service';
import { DestroyComponent } from '../destroy/destroy.component';
import { UndeployComponent } from '../undeploy/undeploy.component';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styles: []
})
export class StreamComponent implements OnInit {

  loading = true;
  stream: Stream;
  @ViewChild('destroyModal', { static: true }) destroyModal: DestroyComponent;
  @ViewChild('undeployModal', { static: true }) undeployModal: UndeployComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private streamService: StreamService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.route.params
      .pipe(
        mergeMap(params => {
            this.stream = new Stream();
            this.stream.name = params.name;
            return this.streamService.getStream(params.name);
          }
        )
      )
      .subscribe((stream: Stream) => {
        this.stream = stream;
        this.loading = false;
      }, (error) => {
        this.notificationService.error('An error occurred', error);
        if (HttpError.is404(error)) {
          this.back();
        }
      });
  }

  destroy() {
    this.destroyModal.open([this.stream]);
  }

  deploy() {
  }

  undeploy() {
    this.undeployModal.open([this.stream]);
  }

  back() {
    this.router.navigateByUrl('streams/list');
  }
}
