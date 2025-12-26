import { FormArray, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

async function sleep(): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => { 
      resolve(true);
    }, 2500);
    });
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null{
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe tener un valor mayor o igual a ${errors['min'].min}`;
        case 'notStrider':
          return 'No puede ser Strider';
        case 'email':
          return 'No es una dirección de email válida';
        case 'emailTaken':
          return 'Este email ya está registrado';
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'No es una dirección de email válida';
          }
          return 'Error de expresión regular';
        default:
          return `Error no controlado ${key}`;
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

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { notEqual: true };
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'strider') {
      return {
        notStrider: true,
      };
    }
    return null;
  }
}
