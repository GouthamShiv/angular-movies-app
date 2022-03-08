import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category, CreditsDTO, ImagesDTO, MovieDTO, MoviesDTO, VideoDTO } from '../models/movie';
import { GenresDTO } from '../models/genres';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseURL: string = 'https://proxy.webstash.in/api/v1/tmdb';

  language: string = 'en-US';

  constructor(private http: HttpClient) {}

  getData(type: string = 'upcoming', category: Category = Category.movie, count: number = 12) {
    return this.http.get<MoviesDTO>(`${this.baseURL}/${category}/${type}?language=${this.language}`).pipe(
      switchMap((res) => {
        return of(res.data.results.slice(0, count));
      }),
    );
  }

  search(searchValue?: string, category: Category = Category.movie, page: number = 1) {
    const url = searchValue ? `search/${category}` : `${category}/popular`;
    return this.http
      .get<MoviesDTO>(`${this.baseURL}/${url}?page=${page}&query=${searchValue}&language=${this.language}`)
      .pipe(
        switchMap((res) => {
          return of(res.data.results);
        }),
      );
  }

  getById(id: string, category: Category = Category.movie) {
    return this.http.get<MovieDTO>(`${this.baseURL}/${category}/${id}?`);
  }

  getVideos(id: string, category: Category = Category.movie) {
    return this.http.get<VideoDTO>(`${this.baseURL}/${category}/${id}/videos`).pipe(
      switchMap((res) => {
        return of(res.data.results);
      }),
    );
  }

  getImages(id: string, category: Category = Category.movie) {
    return this.http.get<ImagesDTO>(`${this.baseURL}/${category}/${id}/images`);
  }

  getCredits(id: string, category: Category = Category.movie) {
    return this.http.get<CreditsDTO>(`${this.baseURL}/${category}/${id}/credits`);
  }

  getSimilar(id: string, category: Category = Category.movie, count: number = 4) {
    return this.http.get<MoviesDTO>(`${this.baseURL}/${category}/${id}/similar`).pipe(
      switchMap((res) => {
        return of(res.data.results.slice(0, count));
      }),
    );
  }

  getMoviesGenres() {
    return this.http.get<GenresDTO>(`${this.baseURL}/genre/${Category.movie}/list`).pipe(
      switchMap((res) => {
        return of(res.data.genres);
      }),
    );
  }

  getMoviesByGenre(genreId: string, page: number = 1) {
    return this.http
      .get<MoviesDTO>(`${this.baseURL}/discover/${Category.movie}?with_genres=${genreId}&page=${page}`)
      .pipe(
        switchMap((res) => {
          return of(res.data.results);
        }),
      );
  }
}
