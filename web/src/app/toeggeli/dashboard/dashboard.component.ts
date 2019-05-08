import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hash = '';

  players = [
    {
      firstName: 'Steven',
      lastName: 'Imhof',
      username: 'Angry Steven',
      wins: 10,
      losses: 0
    },
    {
      firstName: 'Chiramet',
      lastName: 'Penglerd',
      username: 'Phong',
      wins: 8,
      losses: 2
    },
    {
      firstName: 'Dominik',
      lastName: 'Forster',
      username: 'domi',
      wins: 6,
      losses: 4
    },
    {
      firstName: 'Peter',
      lastName: 'Meier',
      username: 'pete',
      wins: 2,
      losses: 8
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
