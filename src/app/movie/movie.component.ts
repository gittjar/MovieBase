import { Component, OnInit } from '@angular/core';
import { ElokuvaService } from '../elokuva.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movielist: Movie [] = [];
  term = '';
  loading: boolean = true;


  constructor (private hpservice : ElokuvaService) {}

  ngOnInit(): void {
   this.getElokuvat();

  }

  elokuvalista: any;

  getElokuvat():void{
    this.hpservice.getMovieData().subscribe((data: any) => {
      this.elokuvalista = data;
      this.loading = false; // Hide the loading window when data is loaded
    })
  }



SearchComedy() {
  this.getElokuvat(); // reset to default
  this.term = 'Comedy';
}
SearchAction() {
  this.getElokuvat(); // reset to default
  this.term = 'Action';
}

getReleaseDatesEka(): void {
  //this.getElokuvat(); // reset to default
  this.term = ''; // reset to default
  // filter elokuvalista between 1990-2000
  this.elokuvalista = this.elokuvalista.filter(
    (item: { releaseDate: string | number | Date; }) => {
      const releaseYear = new Date(item.releaseDate).getFullYear();
      return releaseYear >= 1990 && releaseYear <= 2000;
    }
  );
}
// sorted by title
sortA(isAsc: boolean) {
  if (isAsc) {
    this.elokuvalista.sort((a: { title: string; }, b: { title: string; }) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
  )} else {
    this.elokuvalista.sort((a: { title: string; }, b: { title: string; }) => (a.title > b.title) ? -1 : ((b.title > a.title) ? 1 : 0)
  )} 
}
// Sort by date
sortB(isAsc: boolean) {
  if (isAsc) {
    this.elokuvalista.sort((a: { releaseDate: Date; }, b: { releaseDate: Date; }) => {
      return a.releaseDate > b.releaseDate ? 1 : a.releaseDate < b.releaseDate ? -1 : 0;
    });
  } else {
    this.elokuvalista.sort((a: { releaseDate: Date; }, b: { releaseDate: Date; }) => {
      return a.releaseDate > b.releaseDate ? -1 : a.releaseDate < b.releaseDate ? 1 : 0;
    });
  }
  }
}
