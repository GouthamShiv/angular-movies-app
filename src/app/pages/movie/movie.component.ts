import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie!: Movie;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    const category = this.router.url.includes(Category.tv) ? Category.tv : Category.movie;
    this.activatedRoute.params.subscribe(({ id }) => {
      switch (category) {
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
