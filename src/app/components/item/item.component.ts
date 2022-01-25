import { Component, Input } from '@angular/core';
import { IMAGE_SIZES } from '../../constants/global';
import { Category, Movie } from '../../models/movie';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: Movie;

  @Input() category!: Category;

  readonly imageSizes = IMAGE_SIZES;
}
