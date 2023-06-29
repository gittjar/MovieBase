import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ElokuvaService {

  constructor(private http : HttpClient) { }

  BASEURL = 'https://corsproxy.io/?https://movieapi2023.azurewebsites.net/api/Movies/';
  getMovieData(): Observable<Movie[]> {
  return this.http.get<any>(this.BASEURL)}
}
