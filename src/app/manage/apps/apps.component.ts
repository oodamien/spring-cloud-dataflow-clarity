import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../shared/api/app.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { App, AppPage } from '../../shared/model/app.model';
import { UnregisterComponent } from './unregister/unregister.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-apps-list',
  templateUrl: './apps.component.html'
})
export class AppsComponent {
  loading = true;
  page: AppPage;
  selected = [];
  grouped = false;
  state: ClrDatagridStateInterface;
  @ViewChild('unregisterModal', { static: true }) unregisterModal: UnregisterComponent;

  constructor(private appService: AppService,
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
    this.appService.getApps(this.state.page.current - 1, this.state.page.size, filters?.name || '', filters?.type || '',
      `${this.state?.sort?.by || ''}`, `${this.state?.sort?.reverse ? 'DESC' : 'ASC'}`)
      .subscribe((page: AppPage) => {
        this.page = page;
        this.selected = [];
        this.loading = false;
      });
  }

  details(app: App) {
    this.router.navigateByUrl(`manage/apps/${app.type}/${app.name}`);
  }

  setMode(grouped: boolean) {
    this.grouped = grouped;
    this.selected = [];
  }

  unregistersApp(apps: App[]) {
    this.unregisterModal.open(apps);
  }

}
