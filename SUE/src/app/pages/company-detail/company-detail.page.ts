import { Component, OnInit, Input } from '@angular/core';
import { ICompany } from 'src/app/interfaces/company.interface';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.page.html',
  styleUrls: ['./company-detail.page.scss'],
})
export class CompanyDetailPage implements OnInit {
  @Input() company: ICompany;

  queueSize: number;
  curUser: IUser;
  enqueued: boolean;

  constructor(private mctrl: ModalController, private http: HttpClient, public storage: Storage) {
    this.storage.get('current_user').then(res => {
      this.curUser = res;
      console.log(res);
    });
  }

  ngOnInit() {
    let ip = 'http://34.69.192.84';
    let url = `${ip}/api/size`;
    let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

    this.http.post<any>(url, { company: this.company.name }, { headers }).subscribe(res => {
      this.queueSize = res.size;
    });
  }

  closeCard() {
    this.mctrl.dismiss({
      'dismissed': true
    });
  }

  joinQueue() {
    console.log(`joining queue for ${this.company.name}`);
    let ip = 'http://34.69.192.84';
    let url = `${ip}/api/enqueue`;
    let headers = new HttpHeaders().set('Content-Type', 'application/JSON');

    this.http.post<any>(url, { student: this.curUser.email, company: this.company.name }, { headers }).subscribe(res => {
      this.enqueued = res.success;
    })
  }
} 
