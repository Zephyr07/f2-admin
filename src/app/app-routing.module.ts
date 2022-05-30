import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {Page404Component} from './page404/page404.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {Page403Component} from './page403/page403.component';
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
import {CategoryAddComponent} from './categories/category-add/category-add.component';
import {LocationAddComponent} from './locations/location-add/location-add.component';
import {RegionAddComponent} from './regions/region-add/region-add.component';
import {SubscriptionAddComponent} from './subscriptions/subscription-add/subscription-add.component';
import {CountryAddComponent} from './countries/country-add/country-add.component';
import {PromotionAddComponent} from './promotions/promotion-add/promotion-add.component';
import {TownListComponent} from './towns/town-list/town-list.component';
import {TownAddComponent} from './towns/town-add/town-add.component';



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
        children: [
          {
            path : 'list',
            component : CategoryListComponent,
          },
          {
            path : 'add',
            component : CategoryAddComponent,
          },
          {
            path : 'edit/:id',
            component : CategoryAddComponent,
          }
        ]
      },
      {
        path : 'countries',
        children: [
          {
            path : 'list',
            component : CountryListComponent,
          },
          {
            path : 'add',
            component : CountryAddComponent,
          },
          {
            path : 'edit/:id',
            component : CountryAddComponent,
          }
        ]
      },
      {
        path : 'locations',
        children: [
          {
            path : 'list',
            component : LocationListComponent,
          },
          {
            path : 'add',
            component : LocationAddComponent,
          },
          {
            path : 'edit/:id',
            component : LocationAddComponent,
          }
        ]
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
      },
      {
        path : 'promotions',
        children: [
          {
            path : 'list',
            component : PromotionListComponent,
          },
          {
            path : 'add',
            component : PromotionAddComponent,
          },
          {
            path : 'edit/:id',
            component : PromotionAddComponent,
          }
        ]
      },
      {
        path : 'regions',
        children: [
          {
            path : 'list',
            component : RegionListComponent,
          },
          {
            path : 'add',
            component : RegionAddComponent,
          },
          {
            path : 'edit/:id',
            component : RegionAddComponent,
          }
        ]
      },
      {
        path : 'towns',
        children: [
          {
            path : 'list',
            component : TownListComponent,
          },
          {
            path : 'add',
            component : TownAddComponent,
          },
          {
            path : 'edit/:id',
            component : TownAddComponent,
          }
        ]
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
        children: [
          {
            path : 'list',
            component : SubscriptionListComponent,
          },
          {
            path : 'add',
            component : SubscriptionAddComponent,
          },
          {
            path : 'edit/:id',
            component : SubscriptionAddComponent,
          }
        ]
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
