/*********************************************************************************
 * WEB422 – Assignment 6
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Jungjoo Kim Student ID: 162 641 195 Date: December 2, 2021
 *
 * Angular App (Deployed) Link: https://web-422-final.vercel.app/
 *
 * User API (Heroku) Link: https://jay-web422-a6.herokuapp.com
 ********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string = '';
  token!: any;

  constructor(private router: Router, private auth: AuthService) {}

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  ngOnInit(): void {
    this.searchString = '';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
