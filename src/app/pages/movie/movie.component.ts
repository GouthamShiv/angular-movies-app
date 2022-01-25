import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_SIZES } from 'src/app/constants/global';
import { Category, Movie, Video } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie!: Movie;

  category = Category;

  videos: Video[] = [];

  readonly imageSizes = IMAGE_SIZES;

  urlCategory: Category = Category.movie;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.urlCategory = this.router.url.includes(Category.tv) ? Category.tv : Category.movie;
    this.activatedRoute.params.subscribe(({ id }) => {
      switch (this.urlCategory) {
        case Category.tv: {
          this.getData(id, Category.tv);
          this.getVideosData(id, Category.tv);
          break;
        }
        case Category.movie: {
          this.getData(id, Category.movie);
          this.getVideosData(id, Category.movie);
          break;
        }
        default: {
          this.getData(id, Category.movie);
          this.getVideosData(id, Category.movie);
          break;
        }
      }
    });
  }

  getData(id: string, category: Category): void {
    this.moviesService.getById(id, category).subscribe((res) => {
      this.movie = res;
    });
  }

  getVideosData(id: string, category: Category) {
    this.moviesService.getVideos(id, category).subscribe((res) => {
      this.videos = res;
    });
  }
}
