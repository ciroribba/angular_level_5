import { Component, inject} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray} from '@angular/forms';
import { FormUtils } from '../../../utils/form-util';
@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage { 
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding',Validators.required],
    ],
  Validators.minLength(3)),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // isValidFieldInArray(form: FormArray, index: number) {
  //   return form.controls[index].errors && form.controls[index].touched;
  // }

  // getFieldErrorInArray(form: FormArray, index: number) {
  //   return form.controls[index].errors && form.controls[index].touched;
  // }
}
