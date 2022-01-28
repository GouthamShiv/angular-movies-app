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

  searchPlaceholder = '';

  genreId: string | null = null;

  searchValue: string | undefined = undefined;

  constructor(private moviesService: MoviesService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.router.url.includes(Category.movie) ? Category.movie : Category.tv;
    const searchFor = this.category === Category.movie ? Category.movie : `${Category.tv} show`;
    this.searchPlaceholder = `Search for your favorite ${searchFor} here!`;

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

  getPagedMovies(page: number = 1, searchValue?: string) {
    this.moviesService.search(searchValue, Category.movie, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getPagedTVShows(page: number = 1, searchValue?: string) {
    this.moviesService.search(searchValue, Category.tv, page).subscribe((tvShows) => {
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
      this.getPagedMovies(pageNum, this.searchValue);
    } else {
      this.getPagedTVShows(pageNum, this.searchValue);
    }
  }

  search() {
    if (this.category === Category.movie) {
      this.getPagedMovies(1, this.searchValue);
    } else {
      this.getPagedTVShows(1, this.searchValue);
    }
  }
}
