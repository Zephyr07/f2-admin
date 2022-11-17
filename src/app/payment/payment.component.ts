import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ApiProvider} from '../providers/api/api';

declare var Metro;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payments:any = [];
  search = "";
  constructor(private api:ApiProvider) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    const load = Metro.activity.open({
      type: 'metro',
      overlayColor: '#fff',
      overlayAlpha: 1,
      text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
      overlayClickClose: true
    });
    const opt = {
      should_paginate: false,
      _sort: 'name',
      _sortDir: 'asc',
      _includes:'user.person,subscription'
    };
    this.api.Payments.getList(opt).subscribe(data => {
      //console.log(data);
      data.forEach(v=>{
        v.utilisateur=v.user.name;
        v.abonnment=v.subscription.name;
      });
      this.payments = data;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getPayments ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getPayments ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  deletePayment(i){

  }

  newPayment(){

  }

  validateUser(s){

  }

}
