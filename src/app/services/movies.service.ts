import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, MovieDTO } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  searchMovies(category: Category = Category.movie, page: number = 1) {
    return this.http
      .get<MovieDTO>(
        `${this.baseURL}/${category}/popular?page=${page}&api_key=${this.apiKey}&language=${this.language}`,
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        }),
      );
  }
}
