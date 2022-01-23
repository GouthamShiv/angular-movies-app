import { Component, Input } from '@angular/core';
import { IMAGE_SIZES } from 'src/app/constants/global';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: Movie;
  readonly imageSizes = IMAGE_SIZES;
}
