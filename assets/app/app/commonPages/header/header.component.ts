import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today: string = moment().format('DD MMM YYYY');
  constructor() { }

  ngOnInit(): void {
  }

}
