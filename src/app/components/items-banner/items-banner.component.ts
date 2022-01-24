import { Component, Input } from '@angular/core';
import { Category, Movie } from 'src/app/models/movie';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() banner!: string;
  @Input() category!: Category;
}
