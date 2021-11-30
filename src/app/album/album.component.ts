import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MusicDataService } from './../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: any;

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.musicData.getAlbumByID(id).subscribe((data) => { this.album = data });
  }

  addToFavourites(id: any): void {
    this.musicData.addToFavourites(id).subscribe(
      (data) => {
        this.snackbar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackbar.open('Unable to add song to Favourites...', 'Done', {
          duration: 2500,
        });
      }
    );
  }
}
