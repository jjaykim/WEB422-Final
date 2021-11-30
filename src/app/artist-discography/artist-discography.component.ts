import { MusicDataService } from './../music-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any;
  artist: any;

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.musicData.getArtistById(id).subscribe((data) => {
      this.artist = data;
    });

    this.musicData.getAlbumsByArtistId(id).subscribe((data) => {
      this.albums = data.items.filter(
        (item: any, idx: any) =>
          data.items.findIndex(
            (anotherItem: any) => anotherItem.name === item.name
          ) === idx
      );
    });
  }
}
