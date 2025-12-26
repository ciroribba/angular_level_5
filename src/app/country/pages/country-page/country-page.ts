import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../services/country.service';
import { Country } from '../interfaces/country.interface';
import { switchMap, tap, filter } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  fb = inject(FormBuilder);

  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  bordersByCountry = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanup ) => {
    const regionSuscriptions = this.onRegionChanged();
    const countrySuscriptions = this.onCountryChanged();
    onCleanup(() => {
      regionSuscriptions.unsubscribe();
      countrySuscriptions.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.bordersByCountry.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap(region => this.countryService.getCountriesByRegion(region!)),
    )
    .subscribe( countries=> {
      this.countriesByRegion.set(countries);
    });
  }

  onCountryChanged() {
    return this.myForm
    .get('country')!
    .valueChanges.pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter(value => value!.length > 0),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode!)),
      switchMap(country => this.countryService.getCountryNamesByCodeArray(country.borders!)),
    )
    .subscribe( borders=> {
      this.bordersByCountry.set(borders);
    });
  }
}
