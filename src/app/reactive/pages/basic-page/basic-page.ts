import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-util';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  //Formulario con el builder
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []], //name, sync validators, async validators
    price: [0, [Validators.required, Validators.min(10)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []],
  });

  onSave(): void {
    if (this.myForm.invalid) {
      // Si el formulario es inválido, se marcan todos los campos como tocados
      this.myForm.markAllAsTouched(); // Para que se marquen todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
