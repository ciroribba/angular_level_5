import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-util';

@Component({
  selector: 'switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
})
export class SwitchesPage {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantsNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      // Si el formulario es inválido, se marcan todos los campos como tocados
      this.myForm.markAllAsTouched(); // Para que se marquen todos los campos como tocados
      return;
    }
  }
}
