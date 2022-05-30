import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:any = [];
  search = "";
  constructor(private api:ApiProvider) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
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
      _includes : 'brand,category,seller'
    };
    this.api.Products.getList(opt).subscribe(data => {
      //console.log(data);
      data.forEach((v,k)=>{
        v.categorie=v.category.name;
        v.vendeur=v.seller.name;
        v.marque=v.brand.name;
      })
      this.products = data;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getProducts ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getProducts ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  deleteProduct(i){

  }

  newProduct(){

  }

}
