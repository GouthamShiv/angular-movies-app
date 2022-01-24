import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_SIZES } from 'src/app/constants/global';
import { Category, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie!: Movie;
  category = Category;
  urlCategory: Category = Category.movie;
  readonly imageSizes = IMAGE_SIZES;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.urlCategory = this.router.url.includes(Category.tv) ? Category.tv : Category.movie;
    this.activatedRoute.params.subscribe(({ id }) => {
      switch (this.urlCategory) {
        case Category.tv: {
          this.getData(id, Category.tv);
          break;
        }
        case Category.movie: {
          this.getData(id, Category.movie);
          break;
        }
        default: {
          this.getData(id, Category.movie);
          break;
        }
      }
    });
  }

  getData(id: string, category: Category) {
    this.moviesService.getById(category, id).subscribe((res) => (this.movie = res));
  }
}
