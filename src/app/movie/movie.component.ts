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

  constructor (private hpservice : ElokuvaService) {}

  ngOnInit(): void {
   this.getElokuvat();
   this.loadingDataWindow();

  }

  elokuvalista: any;

  getElokuvat():void{
    this.hpservice.getMovieData().subscribe((data: any) => {
      this.elokuvalista = data;
    })
  }

  isLoading: boolean = true;
  loadingDataWindow() {
    setTimeout(() => {
    // Data loading is complete
    this.isLoading = false;
    }, 2700);
}

SearchComedy() {
  this.getElokuvat(); // reset to default
  this.term = 'Comedy'
}
SearchAction() {
  this.getElokuvat(); // reset to default
  this.term = 'Action'
}

getReleaseDatesEka(): void {
  this.getElokuvat(); // reset to default
  this.term = ''; // reset to default
  // filter elokuvalista 1990-2000
  this.elokuvalista = this.elokuvalista.filter(
    (item: { releaseDate: string | number | Date; }) => {
      const releaseYear = new Date(item.releaseDate).getFullYear();
      return releaseYear >= 1990 && releaseYear <= 2000;
    }
  );
}


}
