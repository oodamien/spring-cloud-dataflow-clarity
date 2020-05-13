import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteStartersComponent } from './website-starters.component';

describe('WebsiteStartersComponent', () => {
  let component: WebsiteStartersComponent;
  let fixture: ComponentFixture<WebsiteStartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteStartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteStartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
