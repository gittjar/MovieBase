import { Component, OnInit } from '@angular/core';
import { ElokuvaService } from '../elokuva.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie',

  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  term: string = ''; 
  originalElokuvalista: Movie[] = [];
  elokuvalista: Movie[] = [];
  loading: boolean = true;

  constructor (private hpservice : ElokuvaService) {}

  ngOnInit(): void {
    this.getElokuvat();
  }

  getElokuvat():void{
    this.hpservice.getMovieData().subscribe((data: any) => {
      this.originalElokuvalista = data;
      this.elokuvalista = [...data];
      this.loading = false; // Hide the loading window when data is loaded
    })
  }

  SearchComedy() {
    this.elokuvalista = this.originalElokuvalista.filter(movie => movie.genre === 'Comedy');
  }

  SearchAction() {
    this.elokuvalista = this.originalElokuvalista.filter(movie => movie.genre === 'Action');
  }

  getReleaseDatesEka(): void {
    this.elokuvalista = this.originalElokuvalista.filter(
      (item: { releaseDate: string | number | Date; }) => {
        const releaseYear = new Date(item.releaseDate).getFullYear();
        return releaseYear >= 1990 && releaseYear <= 2000;
      }
    );
  }

  sortA(isAsc: boolean) {
    this.elokuvalista = [...this.originalElokuvalista].sort((a: { title: string; }, b: { title: string; }) => 
      isAsc ? (a.title > b.title ? 1 : -1) : (a.title < b.title ? 1 : -1)
    );
  }

  sortB(isAsc: boolean) {
    this.elokuvalista = [...this.originalElokuvalista].sort((a: { releaseDate: string; }, b: { releaseDate: string; }) => 
      isAsc ? (new Date(a.releaseDate) > new Date(b.releaseDate) ? 1 : -1) : (new Date(a.releaseDate) < new Date(b.releaseDate) ? 1 : -1)
    );
  }
}

