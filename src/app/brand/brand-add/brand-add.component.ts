import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {
  action = "";
  name:string = "";
  public logo = new FormData();
  public imageSrc ="";
  file_selected =false;
  parent_id:any;
  brands:any = {};
  show = false;
  message_toast="";
  id=0;
  brand:any={};

  constructor(
    private api:ApiProvider,
    private r : ActivatedRoute
  ) {
    this.id=parseInt(this.r.snapshot.paramMap.get('id'));
    console.log(this.id);
    if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
      this.action = "Modifier";
    } else {
      this.action = "Nouvelle";

    }
    console.log(this.id);
    this.getBrands();
  }

  ngOnInit(): void {
  }

  getBrands() {
    const load = Metro.activity.open({
      type: 'metro',
      overlayColor: '#fff',
      overlayAlpha: 0,
      text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
      overlayClickClose: true
    });
    this.api.Brands.getList({should_paginate: false, _sort: 'name', _sortDir: 'asc'}).subscribe(data => {
      console.log(data);
      let x = {};
      data.forEach(v => {
        if(this.id!=0 && this.id==v.id){
          this.brand = v;
          this.name = v.name;
          this.parent_id=v.parent_id;
          this.imageSrc=v.logo;
        }
        x[v.id] = v.name;
      });
      this.brands = x;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getBrands ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getBrands ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  save(){
    if(this.checkForm()){
      if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
        // modification marque
        this.brand.name = this.name;
        // retrait de l'logo dans le put
        delete this.brand.logo;
        this.brand.put().subscribe((data)=>{
          this.saveImage(data,'modifiée');
        })
      } else {
        // nouvelle marque
        let brand={
          name:this.name,
        };
        // enregistrement
        this.api.Brands.post(brand).subscribe((d)=>{
          // enregistrement de l'logo
          this.saveImage(d, 'créée');
        }, q => {
          if (q.data.error.status_code === 500) {
            Metro.notify.create('saveBrands ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          } else if (q.data.error.status_code === 401) {
            Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
          } else {
            Metro.notify.create('saveBrands ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          }
        })
      }

    }

  }

  reset(){
    this.name='';
    this.logo = new FormData();
    this.imageSrc ="";
  }

  saveImage(d,text){
    if(this.file_selected){
      // update du fichier
      this.logo.append('_method', 'PUT');
      this.api.restangular.all('brands/' + d.body.id).customPOST(this.logo, undefined, undefined, {'Content-Type': undefined}).subscribe((da:any) => {
        Metro.notify.create('Marque '+d.body.name+' '+text, 'Succès', {keepOpen: true, cls: 'bg-noir fg-white'});
        this.reset();
      }, q => {
        if (q.data.error.status_code === 500) {
          Metro.notify.create('saveImage ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
        } else if (q.data.error.status_code === 401) {
          Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
        } else {
          Metro.notify.create('saveImage ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
        }
      });
    } else {
      Metro.notify.create('Marque '+d.body.name+' '+text, 'Succès', {keepOpen: true, cls: 'bg-noir fg-white'});
      this.reset();
    }
  }

  checkForm() {
    if(this.name==undefined || this.name==null || this.name==""){
      this.message_toast = "Nom absent";
      this.show = true;
      return false;
    } else {
      this.show = false;
      return true;
    }
  }

  onSelectFile(event:any) {
    this.file_selected = true;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    //this.imageSrc = reader.result as string;
    this.logo.append('logo', event.target.files[0], event.target.files[0].name);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

}
