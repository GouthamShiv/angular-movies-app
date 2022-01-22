import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fdb64b0d0951d5a59a9a08580a11d523',
    );
  }
}
