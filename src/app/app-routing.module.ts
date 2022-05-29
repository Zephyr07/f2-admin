import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {Page404Component} from './page404/page404.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {Page403Component} from './page403/page403.component';
import {PermissionsComponent} from './permissions/permissions.component';
import {BrandListComponent} from './brand/brand-list/brand-list.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {CountryListComponent} from './countries/country-list/country-list.component';
import {LocationListComponent} from './locations/location-list/location-list.component';
import {PaymentComponent} from './payment/payment.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {PromotionListComponent} from './promotions/promotion-list/promotion-list.component';
import {RegionListComponent} from './regions/region-list/region-list.component';
import {SellersComponent} from './sellers/sellers.component';
import {SubscriptionListComponent} from './subscriptions/subscription-list/subscription-list.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';
import {BrandAddComponent} from './brand/brand-add/brand-add.component';



const routes: Routes = [
  {
    path : 's',
    component : SidemenuComponent,
    children : [
      {
        path : 'dashboard',
        component : DashboardComponent,
        /*children: [
          {
            path : 'facture/:customer_id',
            component : FactureComponent,
          }
        ]*/
      },
      {
        path : 'brands',
        children: [
          {
            path : 'list',
            component : BrandListComponent,
          },
          {
            path : 'add',
            component : BrandAddComponent,
          },
          {
            path : 'edit/:id',
            component : BrandAddComponent,
          }
        ]
      },
      {
        path : 'categories',
        component : CategoryListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.customer-universe'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'countries',
        component : CountryListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.customer-universe'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'locations',
        component : LocationListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'payments',
        component : PaymentComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'products',
        component : ProductListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'promotions',
        component : PromotionListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'regions',
        component : RegionListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'sellers',
        component : SellersComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'subscriptions',
        component : SubscriptionListComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
      {
        path : 'suggestions',
        component : SuggestionsComponent,
        /*canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['consult.dashboard'],
            redirectTo: '/403'
          }
        }*/
      },
    ]
  },
  {
    path : '403',
    component : Page403Component,
  },

  {path : 'login', component : LoginComponent},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
