import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiProvider} from '../../providers/api/api';
declare var Metro;

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {
  action = "";
  name:string = "";
  code:string = "";
  status:string = "";
  countries:any = {};
  show = false;
  message_toast="";
  id=0;
  country:any={};

  constructor(
    private api:ApiProvider,
    private r : ActivatedRoute
  ) {
    this.id=parseInt(this.r.snapshot.paramMap.get('id'));
    if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
      this.action = "Modifier";
      this.getCountry(this.id);
    } else {
      this.action = "Nouveau";

    }
  }

  ngOnInit(): void {
  }

  getCountry(id){
    const load = Metro.activity.open({
      type: 'metro',
      overlayColor: '#fff',
      overlayAlpha: 0,
      text: '<div class=\'mt-2 text-small\'>Chargement des données...</div>',
      overlayClickClose: true
    });
    this.api.Countries.get(id).subscribe(d=>{
      this.country=d;
      this.code = d.body.code;
      this.name = d.body.name;
      this.status = d.body.status;
      Metro.activity.close(load);
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('getCountry ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.activity.close(load);
        Metro.notify.create('getCountry ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    })
  }

  save(){
    if(this.checkForm()){
      if(this.id!=undefined && this.id!=null && this.id!=0 && !isNaN(this.id)){
        // modification marque
        this.country.name = this.name;
        this.country.code = this.code;
        this.country.status = this.status;
        this.country.id = this.country.body.id;

        this.country.put().subscribe((data)=>{
          Metro.notify.create('Pays '+data.body.name+' modifié', 'Succès', {timeout: 5000, cls: 'bg-noir fg-white'});
          this.reset();
        }, q => {
          if (q.data.error.status_code === 500) {
            Metro.notify.create('saveCountries ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          } else if (q.data.error.status_code === 401) {
            Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
          } else {
            Metro.notify.create('saveCountries ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          }
        })
      } else {
        // nouvelle marque
        let country={
          name:this.name,
          code:this.code,
          status:this.status,
        };
        // enregistrement
        this.api.Countries.post(country).subscribe((d)=>{
          Metro.notify.create('Pays '+d.body.name+' crée', 'Succès', {keepOpen: true, cls: 'bg-noir fg-white'});
          this.reset();
        }, q => {
          if (q.data.error.status_code === 500) {
            Metro.notify.create('saveCountries ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          } else if (q.data.error.status_code === 401) {
            Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
          } else {
            Metro.notify.create('saveCountries ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
          }
        })
      }

    }

  }

  reset(){
    this.name='';
    this.status='';
    this.code='';
  }


  checkForm() {
    if(this.name==undefined || this.name==null || this.name==""){
      this.message_toast = "Nom absent";
      this.show = true;
      return false;
    } else if(this.code==undefined || this.code==null || this.code==""){
      this.message_toast = "Code absent";
      this.show = true;
      return false;
    } else if(this.status==undefined || this.status==null || this.status==""){
      this.message_toast = "Statut absent";
      this.show = true;
      return false;
    } else {
      this.show = false;
      return true;
    }
  }
}
