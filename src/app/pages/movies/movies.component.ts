/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.category = this.router.url.includes(Category.movie) ? Category.movie : Category.tv;
    if (this.category === Category.movie) {
      this.getPagedMovies(1);
    } else {
      this.getPagedTVShows(1);
    }
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

  paginate(event: any) {
    if (this.category === Category.movie) {
      this.getPagedMovies(++event.page);
    } else {
      this.getPagedTVShows(++event.page);
    }
  }
}
