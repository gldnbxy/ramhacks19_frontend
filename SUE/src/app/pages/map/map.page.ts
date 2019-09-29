import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/interfaces/company.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CompanyDetailPage } from '../company-detail/company-detail.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  companies1: ICompany[];
  companies2: ICompany[];
  companies3: ICompany[];

  constructor(private http: HttpClient, private mctrl: ModalController, public storage: Storage) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    console.log(`Making a call to get list of comapies`);

    let ip = 'http://34.69.192.84'
    let url = `${ip}/api/company`;

    this.http.get<ICompany[]>(url).subscribe(res => {
      console.log(`#########################################`);
      console.log(`Server Returned a list of size: ${res.length} `);
      console.log(res);
      this.companies1 = res.slice(0, Math.ceil(res.length / 3));
      console.log(`C1: ${this.companies1.length}`);
      this.companies2 = res.slice(Math.ceil(res.length / 3), Math.ceil(res.length / 3) * 2);
      console.log(`C2: ${this.companies2.length}`);
      this.companies3 = res.slice(Math.ceil(res.length / 3) * 2, res.length);
      console.log(`C3: ${this.companies3.length}`);

    });
  }

  async openCompanyDetail(company: ICompany) {

    let curUser: IUser;

    this.storage.get('current_user').then(res => {
      curUser = res;
      let ip = 'http://34.69.192.84'
      let url = `${ip}/api/status`;
      let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

      this.http.post<any>(url, { company: company.name, student: curUser.email }, { headers }).subscribe(async res => {
        curUser.linelocation = res.pos;
        this.storage.set('current_user', curUser);
        console.log(res);
        console.log(curUser);
        let detailMod = await this.mctrl.create({
          component: CompanyDetailPage,
          componentProps: { 'company': company }
        });
        return await detailMod.present();
      });
    })

  }

}
