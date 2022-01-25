import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { Category, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  popularMovies: Movie[] = [];

  upcomingMovies: Movie[] = [];

  topRatedMovies: Movie[] = [];

  topRatedTVShows: Movie[] = [];

  category = Category;

  private subSink = new SubSink();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.subSink.add(
      this.moviesService.getData('popular', Category.movie, 12).subscribe((res) => {
        this.popularMovies = res;
      }),
    );
    this.subSink.add(
      this.moviesService.getData('upcoming', Category.movie, 12).subscribe((res) => {
        this.upcomingMovies = res;
      }),
    );
    this.subSink.add(
      this.moviesService.getData('top_rated', Category.movie, 12).subscribe((res) => {
        this.topRatedMovies = res;
      }),
    );
    this.subSink.add(
      this.moviesService.getData('top_rated', Category.tv, 12).subscribe((res) => {
        this.topRatedTVShows = res;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
