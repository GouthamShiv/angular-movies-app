import { Component, OnInit } from '@angular/core';
import { Category, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number = 1) {
    this.moviesService.searchMovies(Category.movie, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    const newEvent = event;
    newEvent.page += 1;
    this.getPagedMovies(newEvent);
  }
}
