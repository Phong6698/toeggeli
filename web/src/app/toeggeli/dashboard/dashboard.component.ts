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
      username: 'Angry Steven'
    },
    {
      firstName: 'Chiramet',
      lastName: 'Penglerd',
      username: 'Phong'
    },
    {
      firstName: 'Dominik',
      lastName: 'Forster',
      username: 'domi'
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
