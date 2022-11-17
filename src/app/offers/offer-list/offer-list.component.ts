import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers:any = [];
  search = "";
  offer:any = {
    location:{
      town:{}
    },
    images:[]
  };
  // infinite scroll
  per_page = 10;
  page = 1;
  last_page = 10000000;
  max_length = 0;
  old_max_length = 0;
  throttle = 30;
  scrollDistance = 1;
  scrollUpDistance = 2;
  isLoading = false;
  constructor(private api:ApiProvider) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    console.log(this.page);
    if(!this.isLoading && this.page<=this.last_page){
      this.isLoading = true;
      const load = Metro.activity.open({
        type: 'metro',
        overlayColor: '#fff',
        overlayAlpha: 1,
        text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
        overlayClickClose: true
      });
      const opt = {
        should_paginate: true,
        _sort: 'name',
        _sortDir: 'asc',
        _includes : 'brand,category,seller,location.town,images',
        per_page: this.per_page,
        page: this.page
      };
      this.api.Offers.getList(opt).subscribe(data => {
        this.last_page = data.metadata.last_page;
        this.max_length = data.metadata.total;
        this.old_max_length = this.max_length;
        data.forEach((v,k)=>{
          v.categorie=v.category.name;
          v.vendeur=v.seller.name;
          v.marque=v.brand.name;
          this.offers.push(v);
        });
        //this.offers = data;
        Metro.activity.close(load);
        this.page++;
        this.isLoading = false;
      }, q => {
        if (q.data.error.status_code === 500) {
          Metro.notify.create('getOffers ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
        } else if (q.data.error.status_code === 401) {
          Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
        } else {
          Metro.activity.close(load);
          Metro.notify.create('getOffers ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
        }
      });
    }
  }

  deleteOffer(i){
    this.api.deleteItem(i,'Produit',false,this.getOffers());
  }

  showDetail(i){
    this.offer=i;
    Metro.dialog.open('#dialog');
  }

  validateOffer(i,status){
    this.api.Offers.get(i.id).subscribe(d=>{
      d.id=i.id;
      d.status=status;
      d.put().subscribe(a=>{
        Metro.notify.create('Status modifié', 'Succès', {timeout: 5000, cls: 'bg-noir fg-white'});
      })
    })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onScrollDown(ev) {
    this.getOffers();
    console.log("aze");
  }

  onUp(ev){

  }
}
