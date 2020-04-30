import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Router } from '@angular/router';
import { StreamService } from '../../shared/api/stream.service';
import { Stream, StreamPage } from '../../shared/model/stream.model';

@Component({
  selector: 'app-streams-list',
  templateUrl: './streams.component.html',
})
export class StreamsComponent {
  loading = true;
  page: StreamPage;
  selected = [];
  grouped = false;
  state: ClrDatagridStateInterface;

  // @ViewChild('unregisterModal', { static: true }) unregisterModal: UnregisterComponent;

  constructor(private streamService: StreamService,
              private router: Router) {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.loading = true;
    this.grouped = false;
    const filters: { [prop: string]: any } = {};
    if (this.state.filters) {
      for (const filter of this.state.filters) {
        const { property, value } = filter;
        filters[property] = value;
      }
    }
    this.streamService.getStreams(this.state.page.current - 1, this.state.page.size, filters?.name || '',
      `${this.state?.sort?.by || ''}`, `${this.state?.sort?.reverse ? 'DESC' : 'ASC'}`)
      .subscribe((page: StreamPage) => {
        this.page = page;
        this.selected = [];
        this.loading = false;
      });
  }

  details(stream: Stream) {
    this.router.navigateByUrl(`streams/list/${stream.name}`);
  }

  setMode(grouped: boolean) {
    this.grouped = grouped;
    this.selected = [];
  }

}
