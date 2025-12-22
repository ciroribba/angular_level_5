import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  //Formulario con el builder
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],//name, sync validators, async validators
    price: [0, [Validators.required, Validators.min(10)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []],
  });
  //Formulario con el constructor
  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',[],[]),
  //   price: new FormControl(0 [],[]),
  //   inStorage: new FormControl(0 [],[]),
  // });

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe tener un valor mayor o igual a ${errors['min'].min}`;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {// Si el formulario es inválido, se marcan todos los campos como tocados
      this.myForm.markAllAsTouched();// Para que se marquen todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
 }
