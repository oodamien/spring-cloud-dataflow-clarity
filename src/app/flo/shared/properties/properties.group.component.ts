import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import PropertyFilter = Properties.PropertyFilter;
import { Properties } from 'spring-flo';

@Component({
  selector: 'clr-properties-group',
  templateUrl: './properties.group.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ClrPropertiesGroupComponent implements OnInit {

  @Input()
  propertiesGroupModel: Properties.PropertiesGroupModel;

  @Input()
  form: FormGroup;

  @Input()
  filter: PropertyFilter;

  ngOnInit() {
    if (this.propertiesGroupModel.isLoading) {
      const subscription = this.propertiesGroupModel.loadedSubject.subscribe(loaded => {
        if (loaded) {
          subscription.unsubscribe();
          this.createGroupControls();
        }
      });
    } else {
      this.createGroupControls();
    }
  }

  createGroupControls() {
    this.propertiesGroupModel.getControlsModels().forEach(c => {
      if (c.validation) {
        this.form.addControl(c.id, new FormControl(c.value || '', c.validation.validator, c.validation.asyncValidator));
      } else {
        this.form.addControl(c.id, new FormControl(c.value || ''));
      }
    });
  }

  get controlModelsToDisplay() {
    return this.propertiesGroupModel.getControlsModels().filter(c => !this.filter || this.filter.accept(c.property));
  }

}
