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

}
