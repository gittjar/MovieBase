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

  constructor (private hpservice : ElokuvaService) {}

  ngOnInit(): void {
   this.getElokuvat();
  }

  elokuvalista: any;

  getElokuvat():void{
    this.hpservice.getMovieData().subscribe((data: any) => {
      this.elokuvalista = data;
    })
  }

}
