import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/interfaces/company.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  companies: ICompany[];

  constructor() { }

  ngOnInit() {
  }

}
