import { Component, inject} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
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

  newFavorite = new FormControl('', [Validators.required, Validators.minLength(3)], []);
  //newFavorite = this.fb.control([])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addFavorite() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, [Validators.required, Validators.minLength(3)], []));
    this.newFavorite.reset();
  }

  deleteFavorite(index: number) {    
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

}
