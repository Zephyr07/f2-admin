import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Router} from '@angular/router';
import jsPDF from "jspdf";
import * as moment from 'moment';
declare var Metro;
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  public Brands: any = this.restangular.service('brands');
  public Categories: any = this.restangular.service('categories');
  public Countries: any = this.restangular.service('countries');
  public X3: any = this.restangular.service('retrieve-bills');
  public Customers: any = this.restangular.service('customers');
  public CustomerUsers: any = this.restangular.service('customer_users');
  public Locations: any = this.restangular.service('locations');
  public Offers: any = this.restangular.service('offers');
  public Payments: any = this.restangular.service('payments');
  public PermissionRoles: any = this.restangular.service('permission_roles');
  public Permissions: any = this.restangular.service('permissions');
  public Products: any = this.restangular.service('products');
  public Promotions: any = this.restangular.service('promotions');
  public Receipts: any = this.restangular.service('receipts');
  public Regions: any = this.restangular.service('regions');
  public Roles: any = this.restangular.service('roles');
  public Sellers: any = this.restangular.service('sellers');
  public Subscriptions: any = this.restangular.service('subscriptions');
  public Suggestions: any = this.restangular.service('suggestions');
  public Towns: any = this.restangular.service('towns');
  public Users: any = this.restangular.service('users');
  public RoleUsers: any = this.restangular.service('role_users');
  public me: any = this.restangular.one('auth/me');

  public date_format = 'Y-M-D';

  public autoplay_val = 5000;
  public slide_speed = 700;

  constructor(public restangular: Restangular, private router: Router) {
    restangular.withConfig((RestangularConfigurer) => {});
  }

  formarPrice(price) {
    if (price === undefined) {
      return '';
    } else {
      price += '';
      const tab = price.split('');
      let p = '';
      for (let i = tab.length; i > 0; i--) {
        if (i % 3 === 0) {
          p += ' ';
        }
        p += tab[tab.length - i];
      }
      return p;
    }
  }

  checkUser() {
    if (JSON.parse(localStorage.getItem('user')) == null) {
      Metro.notify.create('Vous n\'êtes pas connecté', 'Erreur de connexion', {cls: 'alert'});
      this.router.navigate(['/login']);
    } else {
      // rien
      /*/ verification si le mot de passe a été reset
      if (!JSON.parse(localStorage.getItem('user')).has_reset_password) {
        this.router.navigate(['/reset', JSON.parse(localStorage.getItem('user')).id]);
      }*/
    }
  }

  deleteItem(i,item,state,call){
    i.remove().subscribe((a:any)=>{
      let texte = item+' '+i.name+ "supprimé";
      if(state){
        texte+="e"
      }
      Metro.notify.create( texte, 'Succès', {timeout: 5000, cls: 'bg-noir fg-white'});
      call();
    }, q => {
      if (q.data.error.status_code === 500) {
        Metro.notify.create('deleteProduct ' + JSON.stringify(q.data.error.message), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      } else if (q.data.error.status_code === 401) {
        Metro.notify.create('Votre session a expiré, veuillez vous <a routerLink="/login">reconnecter</a>  ', 'Session Expirée ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 300});
      } else {
        Metro.notify.create('deleteProduct ' + JSON.stringify(q.data.error.errors), 'Erreur ' + q.data.error.status_code, {cls: 'alert', keepOpen: true, width: 500});
      }
    })
  }
}
