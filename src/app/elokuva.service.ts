import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';


@Injectable({
  providedIn: 'root'
})
export class ElokuvaService {

  private movieUrl = 'https://movierajapinta.azurewebsites.net/api/Movies';
  private movieUrl2 = 'https://localhost:7195/api/Movies';
  private movieUrl3 = '/api';

  // change url to /api


  constructor(private http : HttpClient) { }

  getMovies(): Observable <Movie[]> 
  {
    const headers = new HttpHeaders().set('responseType', 'text');
    return this.http.get<Movie[]>(this.movieUrl3, { headers });
  }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

  BASEURL = 'https://corsproxy.io/?https%3A%2F%2Fmovierajapinta.azurewebsites.net%2Fapi%2FMovies';
  getMovieData(): Observable<any> {
  return this.http.get<any>(this.BASEURL, this.httpOptions)}
}
