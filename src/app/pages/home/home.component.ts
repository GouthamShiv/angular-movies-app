import { Component, OnInit } from '@angular/core';
import { Category, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  topRatedTVShows: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getData('popular', Category.movie, 12).subscribe((res) => {
      this.popularMovies = res;
    });
    this.moviesService.getData('upcoming', Category.movie, 12).subscribe((res) => {
      this.upcomingMovies = res;
    });
    this.moviesService.getData('top_rated', Category.movie, 12).subscribe((res) => {
      this.topRatedMovies = res;
    });
    this.moviesService.getData('top_rated', Category.tv, 12).subscribe((res) => {
      this.topRatedTVShows = res;
    });
  }
}
