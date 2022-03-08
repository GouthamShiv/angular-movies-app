import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { IMAGE_SIZES } from '../../constants/global';
import { Category, Credits, Images, Movie, Video } from '../../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie!: Movie;

  similarData!: Movie[];

  category = Category;

  videos: Video[] = [];

  images: Images | null = null;

  credits: Credits | null = null;

  readonly imageSizes = IMAGE_SIZES;

  urlCategory: Category = Category.movie;

  private subSink = new SubSink();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.urlCategory = this.router.url.includes(Category.tv) ? Category.tv : Category.movie;
    this.subSink.add(
      this.activatedRoute.params.subscribe(({ id }) => {
        switch (this.urlCategory) {
          case Category.tv: {
            this.getData(id, Category.tv);
            this.getVideosData(id, Category.tv);
            this.getImagesData(id, Category.tv);
            this.getCreditsData(id, Category.tv);
            this.getSimilarData(id, Category.tv);
            break;
          }
          case Category.movie: {
            this.getData(id, Category.movie);
            this.getVideosData(id, Category.movie);
            this.getImagesData(id, Category.movie);
            this.getCreditsData(id, Category.movie);
            this.getSimilarData(id, Category.movie);
            break;
          }
          default: {
            console.error(`Unable to determine category! ${this.urlCategory}`);
            break;
          }
        }
      }),
    );
  }

  getData(id: string, category: Category): void {
    this.moviesService.getById(id, category).subscribe((res) => {
      this.movie = res.data;
    });
  }

  getVideosData(id: string, category: Category) {
    this.moviesService.getVideos(id, category).subscribe((res) => {
      this.videos = res;
    });
  }

  getImagesData(id: string, category: Category): void {
    this.moviesService.getImages(id, category).subscribe((res) => {
      this.images = res.data;
    });
  }

  getCreditsData(id: string, category: Category): void {
    this.moviesService.getCredits(id, category).subscribe((res) => {
      this.credits = res.data;
      const casts = this.credits.cast.filter((cast) => cast.profile_path !== null);
      this.credits.cast = casts;
    });
  }

  getSimilarData(id: string, category: Category): void {
    this.moviesService.getSimilar(id, category).subscribe((res) => {
      this.similarData = res;
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
