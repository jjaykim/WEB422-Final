import { MusicDataService } from './../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: string = "";

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.queryParams['q'];

    if (this.searchQuery) {
      this.musicData.searchArtists(this.searchQuery).subscribe((data) => {
        const artist = data.artists.items;
        this.results = artist.filter((item: any) => item.images.length > 0);
      })
    }
  }
}
