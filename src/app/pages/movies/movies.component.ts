/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Category, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  category = Category.tv;

  genreId: string | null = null;

  constructor(private moviesService: MoviesService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.router.url.includes(Category.movie) ? Category.movie : Category.tv;
    this.activatedRoute.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else if (this.category === Category.movie) {
        this.getPagedMovies(1);
      } else {
        this.getPagedTVShows(1);
      }
    });
  }

  getPagedMovies(page: number = 1) {
    this.moviesService.searchMovies(Category.movie, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getPagedTVShows(page: number = 1) {
    this.moviesService.searchMovies(Category.tv, page).subscribe((tvShows) => {
      this.movies = tvShows;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    const pageNum = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNum);
    } else if (this.category === Category.movie) {
      this.getPagedMovies(pageNum);
    } else {
      this.getPagedTVShows(pageNum);
    }
  }
}
