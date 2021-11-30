import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];

  constructor(
    private musicData: MusicDataService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.musicData.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: any) {
    this.musicData.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
    this.snackbar.open('removing from Favourites...', 'Done', {
      duration: 1500,
    });
  }
}
