/* eslint-disable class-methods-use-this */
import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() items: Movie[] = [];

  getRatingCategory(rating: number): string {
    if (rating >= 7) return 'good';
    if (rating >= 5) return 'average';
    return 'bad';
  }
}
