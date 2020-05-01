import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { AppPage } from '../../model/app.model';
import { AppService } from '../../api/app.service';
import { StreamService } from '../../api/stream.service';
import { TaskService } from '../../api/task.service';
import { StreamPage } from '../../model/stream.model';
import { TaskPage } from '../../model/task.model';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  isFocus = false;

  search = new FormControl('');

  searching = {
    apps: false,
    streams: false,
    tasks: false
  };

  results: {
    apps: AppPage,
    streams: StreamPage,
    tasks: TaskPage
  } = {
    apps: null,
    streams: null,
    tasks: null
  };

  subscriptions = {
    apps: null,
    streams: null,
    tasks: null
  };

  constructor(private appService: AppService,
              private streamService: StreamService,
              private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      map((value) => {
        this.searching.apps = true;
        this.searching.streams = true;
        this.searching.tasks = true;
        // this.quickSearch = (value !== '') || this.force;
        return value;
      }),
      debounceTime(300))
      .subscribe((value) => {
        this.results = {
          apps: null,
          streams: null,
          tasks: null
        };
        if (this.subscriptions.apps) {
          this.subscriptions.apps.unsubscribe();
        }
        if (this.subscriptions.streams) {
          this.subscriptions.streams.unsubscribe();
        }
        if (this.subscriptions.tasks) {
          this.subscriptions.tasks.unsubscribe();
        }
        if (this.isSearch()) {
          this.subscriptions.apps = this.appService
            .getApps(0, 5, `${value}`, null, 'name', 'ASC')
            .subscribe((page: AppPage) => {
              this.results.apps = page;
              this.searching.apps = false;
            });
          this.subscriptions.streams = this.streamService
            .getStreams(0, 5, `${value}`, 'name', 'ASC')
            .subscribe((page: StreamPage) => {
              this.results.streams = page;
              this.searching.streams = false;
            });
          this.subscriptions.tasks = this.taskService
            .getTasks(0, 5, `${value}`, 'taskName', 'ASC')
            .subscribe((page: TaskPage) => {
              this.results.tasks = page;
              this.searching.tasks = false;
            });
        } else {
          this.searching.apps = false;
          this.searching.streams = false;
          this.searching.tasks = false;
        }
      });
  }

  isSearch() {
    return this.search.value.trim() !== '';
  }

  isNoResult(): boolean {
    if (this.isSearching()) {
      return false;
    }
    if (!this.results.apps || !this.results.streams || !this.results.tasks) {
      return false;
    }
    return this.results.apps.total === 0 && this.results.streams.total === 0
      && this.results.tasks.total === 0;
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  isSearching(): boolean {
    return this.searching.apps || this.searching.streams || this.searching.tasks;
  }

  onInputFocus() {
    this.isFocus = true;
  }

  onInputBlur() {
    timer(200).subscribe(() => {
      this.isFocus = false;
    });
  }

}
