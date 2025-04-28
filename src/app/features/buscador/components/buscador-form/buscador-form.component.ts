import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscador-form',
  templateUrl: './buscador-form.component.html',
  styleUrl: './buscador-form.component.scss',
})
export class BuscadorFormComponent {
  showAdvancedSearch = false;
  @Output() formEvent = new EventEmitter<FormGroup>();
  @Output() isAdvancedSearch = new EventEmitter<boolean>();

  setSearchAdvancedForm(form: FormGroup) {
    this.formEvent.emit(form);
  }

  onClickToggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    this.isAdvancedSearch.emit(this.showAdvancedSearch);
  }

}
