import {Component, OnInit} from '@angular/core';
import {ApiProvider} from '../providers/api/api';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Router} from '@angular/router';

declare var Metro;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dette: number;
  bill_count;
  customers_count;
  receipts_count;
  date_format = 'Y-M-D';
  deb;
  fin;
  best_seller;
  sum_receipt;
  sellers;
  load;
  today;
  from: any;
  now = new Date();
  to: any;
  public barChartLabels;
  public barChartType = 'bar';
  public barChartData = [
    {
      data: [],
      label: 'Montant recouvré',
      borderColor: '#000',
      hoverBackgroundColor: '#c29d3d',
      backgroundColor: '#888888',
    }
  ];

  constructor(private api: ApiProvider, private router: Router) {
    console.log(moment(this.now));
    this.api.checkUser();
    this.from = new Date();
    this.to = new Date();
    const date = new Date();
    const j = date.getDay();
    let d = j % 7;
    let f = 6 - j % 7;
    if (d === 0) {
      d = 7;
      f = -1;
    }
    moment.locale('fr');

    this.init(moment(new Date()), moment(new Date()));
  }

  ngOnInit() {
  }

  init(deb, fin) {
    this.load = Metro.activity.open({
      type: 'metro',
      overlayColor: '#fff',
      overlayAlpha: 1,
      text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
      overlayClickClose: true
    });

    this.deb = moment(deb);
    this.fin = moment(fin);
    this.getBestSeller();
    this.getReceipts();
    this.getCustomersCount();
    this.getBillsCount();
    Metro.activity.close(this.load);
  }

  getBillsCount() {


  }

  getCustomersCount() {
    this.api.Customers.getList({should_paginate: false, _agg: 'count'}).subscribe(d => {
      this.customers_count = d[0].value;
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getCustomersCount ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.notify.create('getCustomersCount ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  getReceipts() {
    const opt = {
      'received_at-get': this.deb.format(this.date_format),
      'received_at-let': this.fin.format(this.date_format),
      should_paginate: false
    };
    this.api.Receipts.getList(opt).subscribe(d => {
      this.sum_receipt = _.reduce(d, (memo, num) => {
        return memo + num.amount;
      }, 0);
      this.receipts_count = d.length;
      // somme du recouvrement du mois
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getReceipts ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.notify.create('getReceipts ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  getBestSeller() {
    const opt = {
      'user_id-gb': 'sum(amount) as total_amount',
      _sortDir: 'desc',
      _sort: ' total_amount',
      'received_at-get': this.deb.format(this.date_format),
      'received_at-let': this.fin.format(this.date_format),
      _includes: 'user',
      should_paginate: false
    };
    this.api.Receipts.getList(opt).subscribe(d => {
      d = _.sortBy(d, 'total_amount');
      this.sellers = d;
      if (d.length > 0) {
        this.best_seller = d[d.length - 1].user.name;
        // creation des données du chart couple (vendeur, montant)
        const vente = [];
        const vendeur = [];
        d.forEach((v, k) => {
          vente.push(v.total_amount);
          vendeur.push(v.user.name);
        });
        this.barChartData[0].data = vente;
        this.barChartData[0].label = 'Montant recouvré';
        this.barChartLabels = vendeur;
        // Metro.activity.close(this.load);
      }
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getBestSeller ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.notify.create('getBestSeller ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  period() {
    Metro.dialog.open('#periodDialog');
  }

  validate() {
    this.from = new Date(this.from);
    this.to = new Date(this.to);
    this.today = 'du ' + moment(this.from).format('DD/MM/YYYY') + ' au ' + moment(this.to).format('DD/MM/YYYY');
    this.init(this.from, this.to);
  }
}
