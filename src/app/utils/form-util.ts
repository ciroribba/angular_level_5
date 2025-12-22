import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {

  static getTextError(errors: ValidationErrors): string | null{
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

  static isFieldValid(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(form: FormArray, index: number) {
    return form.controls[index].errors && form.controls[index].touched;
  }

  static getFieldErrorInArray(form: FormArray, index: number): string | null {
    if (form.controls.length === 0) return null;
    const errors = form.controls[index].errors || {};
    return FormUtils.getTextError(errors);
  }
}
