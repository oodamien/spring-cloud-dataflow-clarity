import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeployComponent } from './undeploy.component';

describe('UndeployComponent', () => {
  let component: UndeployComponent;
  let fixture: ComponentFixture<UndeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
