import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  action = "";
  name:string = "";
  public image = new FormData();
  public imageSrc ="";
  file_selected =false;
  parent_id:any;
  categories:any = {};
  show = false;
  message_toast="";
  id=0;
  category:any={};

  constructor(
    private api:ApiProvider,
    private r : ActivatedRoute
  ) {
    this.id=parseInt(this.r.snapshot.paramMap.get('id'));
    if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
      this.action = "Modifier";
    } else {
      this.action = "Nouvelle";

    }
    console.log(this.id);
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories() {
    const load = Metro.activity.open({
      type: 'metro',
      overlayColor: '#fff',
      overlayAlpha: 0,
      text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
      overlayClickClose: true
    });
    this.api.Categories.getList({should_paginate: false, _sort: 'name', _sortDir: 'asc'}).subscribe(data => {
      console.log(data);
      let x = {};
      data.forEach(v => {
        if(this.id!=0 && this.id==v.id){
          this.category = v;
          this.name = v.name;
          this.parent_id=v.parent_id;
          this.imageSrc=v.image;
        }
        x[v.id] = v.name;
      });
      this.categories = x;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getCategories ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getCategories ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    });
  }

  save(){
    if(this.checkForm()){
      if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
        // modification catégorie
        this.category.name = this.name;
        if(this.parent_id!=undefined && this.parent_id!=null){
          this.category.parent_id=this.parent_id;
        } else {
          delete this.category.parent_id
        }
        delete this.category.image;
        console.log(this.category);
        this.category.put().subscribe((data)=>{
          this.saveImage(data,'modifiée');
        })
      } else {
        // nouvelle catégorie
        let category={
          name:this.name,
          parent_id:this.parent_id
        };
        // enregistrement
        this.api.Categories.post(category).subscribe((d)=>{
          // enregistrement de l'image
          this.saveImage(d, 'créée');
        }, q => {
          if (q.data.error.status_code === 500) {
            Metro.notify.create('saveCategories ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          } else if (q.data.error.status_code === 401) {
            Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
          } else {
            Metro.notify.create('saveCategories ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          }
        })
      }

    }

  }

  reset(){
    this.name='';
    this.parent_id=null;
    this.image = new FormData();
    this.imageSrc ="";
  }

  saveImage(d,text){
    if(this.file_selected){
      // update du fichier
      this.image.append('_method', 'PUT');
      this.api.restangular.all('categories/' + d.body.id).customPOST(this.image, undefined, undefined, {'Content-Type': undefined}).subscribe((da:any) => {
        Metro.notify.create('Catégorie '+d.body.name+' '+text, 'Succès', {keepOpen: true, cls: 'bg-noir fg-white'});
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
      Metro.notify.create('Catégorie '+d.body.name+' '+text, 'Succès', {keepOpen: true, cls: 'bg-noir fg-white'});
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
    this.image.append('image', event.target.files[0], event.target.files[0].name);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }

}
