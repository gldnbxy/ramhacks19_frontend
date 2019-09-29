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

  ip: string = 'http://34.69.192.84';
  headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/JSON');

  constructor(private mctrl: ModalController, private http: HttpClient, public storage: Storage) {
    this.storage.get('current_user').then(res => {
      this.curUser = res;
      console.log(res);
    });
  }

  ngOnInit() {
    let url = `${this.ip}/api/size`;

    this.http.post<any>(url, { company: this.company.name }, { headers: this.headers }).subscribe(res => {
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
    let url = `${this.ip}/api/enqueue`;

    this.http.post<any>(url, {
      student: this.curUser.email,
      company: this.company.name
    },
      { headers: this.headers }).subscribe(res => {
        this.enqueued = res.success;
        this.closeCard();
      });

  }

  leaveQueue() {
    console.log(`Leaving ${this.company.name}'s queue`);
    let url = `${this.ip}/api/dequeue-student`;
    this.http.post<any>(url, {
      student: this.curUser.email,
      company: this.company.name
    }).subscribe(res => {
      console.log(`Server said: ${res.success}`);
      this.closeCard();
    });

  }
} 
