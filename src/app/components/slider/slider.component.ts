/* eslint-disable class-methods-use-this */
import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
      // transition('* => void', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];
  slideIdx: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.slideIdx = ++this.slideIdx % this.items.length;
    }, 5000);
  }

  getRatingCategory(rating: number): string {
    if (rating >= 7) return 'good';
    if (rating >= 5) return 'average';
    return 'bad';
  }
}
