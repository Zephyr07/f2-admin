import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;
@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions:any = [];
  search = "";
  constructor(private api:ApiProvider) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  getSubscriptions() {
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
    };
    this.api.Subscriptions.getList(opt).subscribe(data => {
      //console.log(data);
      this.subscriptions = data;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getSubscriptions ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getSubscriptions ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  deleteSubscription(i){

  }

  newSubscription(){

  }

}
