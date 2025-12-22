import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage { }
