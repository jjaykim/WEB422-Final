import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from '../environments/environment.prod';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  private favouritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) {}

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', { headers: { Authorization: `Bearer ${token}` } });
      })
    );
  }

  getArtistById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: string): Observable<any> {
    const include_groups = 'album,single';
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include_groups}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumByID(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString: string): Observable<any> {
    const q = searchString;
    const type = 'artist';
    const limit = 50;

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  addToFavourites(id: string): Observable<[String]> {
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id)
  }

  removeFromFavourites(id: string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(
      mergeMap((favouritesArray) => {
        if (favouritesArray.length > 0) {
          return this.spotifyToken.getBearerToken().pipe(
            mergeMap((token) => {
              return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
            })
          );
        } else {
          return new Observable((o) => {
            o.next([]);
          });
        }
      })
    );
  }

  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites`).pipe(
      mergeMap((favouritesArray) => {
        if (favouritesArray.length > 0) {
          return this.spotifyToken.getBearerToken().pipe(
            mergeMap((token) => {
              return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
            })
          );
        } else {
          return new Observable((o) => {
            o.next([]);
          });
        }
      })
    );
  }
}
