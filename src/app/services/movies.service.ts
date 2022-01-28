import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category, Credits, Images, Movie, MovieDTO, VideoDTO } from '../models/movie';
import { GenresDTO } from '../models/genres';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseURL: string = 'https://api.themoviedb.org/3';

  apiKey: string = 'fdb64b0d0951d5a59a9a08580a11d523';

  language: string = 'en-US';

  constructor(private http: HttpClient) {}

  getData(type: string = 'upcoming', category: Category = Category.movie, count: number = 12) {
    return this.http
      .get<MovieDTO>(`${this.baseURL}/${category}/${type}?api_key=${this.apiKey}&language=${this.language}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        }),
      );
  }

  search(searchValue?: string | null, category: Category = Category.movie, page: number = 1) {
    const url = searchValue ? `search/${category}` : `${category}/popular`;
    return this.http
      .get<MovieDTO>(
        `${this.baseURL}/${url}?page=${page}&query=${searchValue}&api_key=${this.apiKey}&language=${this.language}`,
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        }),
      );
  }

  getById(id: string, category: Category = Category.movie) {
    return this.http.get<Movie>(`${this.baseURL}/${category}/${id}?api_key=${this.apiKey}`);
  }

  getVideos(id: string, category: Category = Category.movie) {
    return this.http.get<VideoDTO>(`${this.baseURL}/${category}/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      }),
    );
  }

  getImages(id: string, category: Category = Category.movie) {
    return this.http.get<Images>(`${this.baseURL}/${category}/${id}/images?api_key=${this.apiKey}`);
  }

  getCredits(id: string, category: Category = Category.movie) {
    return this.http.get<Credits>(`${this.baseURL}/${category}/${id}/credits?api_key=${this.apiKey}`);
  }

  getSimilar(id: string, category: Category = Category.movie, count: number = 4) {
    return this.http.get<MovieDTO>(`${this.baseURL}/${category}/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      }),
    );
  }

  getMoviesGenres() {
    return this.http.get<GenresDTO>(`${this.baseURL}/genre/${Category.movie}/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      }),
    );
  }

  getMoviesByGenre(genreId: string, page: number = 1) {
    return this.http
      .get<MovieDTO>(
        `${this.baseURL}/discover/${Category.movie}?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`,
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        }),
      );
  }
}
