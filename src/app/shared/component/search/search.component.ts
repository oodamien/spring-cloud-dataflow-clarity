import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  isFocus = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onInputFocus() {
    this.isFocus = true;
  }

  onInputBlur() {
    this.isFocus = false;
  }

}
