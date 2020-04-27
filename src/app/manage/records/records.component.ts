import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../shared/api/record.service';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { RecordPage } from '../../shared/model/record.model';

@Component({
  selector: 'app-records-list',
  templateUrl: './records.component.html',
})
export class RecordsComponent implements OnInit {

  loading = true;

  page: RecordPage;

  state: ClrDatagridStateInterface;

  constructor(private recordService: RecordService) {
  }

  ngOnInit(): void {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.loading = true;
    const filters: { [prop: string]: any } = {};
    if (this.state.filters) {
      for (const filter of this.state.filters) {
        const { property, value } = filter;
        filters[property] = value;
      }
    }
    if (!filters?.dates) {
      filters.dates = [null, null];
    }
    this.recordService.getRecords(this.state.page.current - 1, this.state.page.size, filters?.search || '', filters?.actionType || '',
      filters?.operationType, filters?.dates[0], filters?.dates[1], `${this.state?.sort?.by || ''}`,
      `${this.state?.sort?.reverse ? 'DESC' : 'ASC'}`)
      .subscribe((page: RecordPage) => {
        this.page = page;
        this.loading = false;
      });
  }


}
