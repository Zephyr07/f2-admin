import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import * as _ from 'lodash';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RestangularModule} from 'ngx-restangular';
import {API_ENDPOINT} from './services/contants';
import {ApiProvider} from './providers/api/api';
import {FormsModule} from '@angular/forms';
import {AuthProvider} from './providers/auth/auth';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './roles/roles.component';
import {NgMetro4Module} from 'ng-metro4';
import {FilterPipe} from './pipe/filter.pipe';
import {Page404Component} from './page404/page404.component';
import {ChartsModule} from 'ng2-charts';
import {NgxPermissionsModule, NgxPermissionsService, NgxRolesService} from 'ngx-permissions';
import {Page403Component} from './page403/page403.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {StatutPipe} from './pipe/status';
import {PriceFormatPipe} from './pipe/price-format';
import {LimitToPipe} from './pipe/limit-to';
import {DateFormatPipe} from './pipe/date-format';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { BrandAddComponent } from './brand/brand-add/brand-add.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { CountryListComponent } from './countries/country-list/country-list.component';
import { CountryAddComponent } from './countries/country-add/country-add.component';
import { LocationAddComponent } from './locations/location-add/location-add.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { PaymentComponent } from './payment/payment.component';
import { PromotionListComponent } from './promotions/promotion-list/promotion-list.component';
import { PromotionAddComponent } from './promotions/promotion-add/promotion-add.component';
import { RegionAddComponent } from './regions/region-add/region-add.component';
import { RegionListComponent } from './regions/region-list/region-list.component';
import { SellersComponent } from './sellers/sellers.component';
import { SubscriptionListComponent } from './subscriptions/subscription-list/subscription-list.component';
import { SubscriptionAddComponent } from './subscriptions/subscription-add/subscription-add.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { TownListComponent } from './towns/town-list/town-list.component';
import { TownAddComponent } from './towns/town-add/town-add.component';

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(API_ENDPOINT)
    .addResponseInterceptor((data, operation, what, url, response, deferred) => {

      if (operation === 'getList') {

        let newResponse = what;
        if (Array.isArray(data)) {

          // newResponse = response.data[what]
          // newResponse.error = response.error
          return data;
        }
        if (data.per_page !== undefined) {
          newResponse = data.data;
          newResponse.metadata = _.omit(data, 'data');
          return newResponse;
        }
        return [{value: data}];


      }

      return response;
    })
    .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
      /*console.log('element',element);
      console.log('operation',operation);
      console.log('what',what);
      console.log('url',url);
      console.log('headers',headers);
      console.log('params',params);*/

      const token = localStorage.getItem('jwt_token');
      if (token) {
        headers.Authorization = 'Bearer ' + token;
        headers['Access-Token'] = token;
      }
    })
  ;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidemenuComponent,
    DashboardComponent,
    UsersComponent,
    RolesComponent,
    FilterPipe,
    StatutPipe,
    DateFormatPipe,
    LimitToPipe,
    PriceFormatPipe,
    Page404Component,
    Page403Component,
    PermissionsComponent,
    ProductListComponent,
    CategoryListComponent,
    CategoryAddComponent,
    BrandAddComponent,
    BrandListComponent,
    CountryListComponent,
    CountryAddComponent,
    LocationAddComponent,
    LocationListComponent,
    PaymentComponent,
    PromotionListComponent,
    PromotionAddComponent,
    RegionAddComponent,
    RegionListComponent,
    SellersComponent,
    SubscriptionListComponent,
    SubscriptionAddComponent,
    SuggestionsComponent,
    TownListComponent,
    TownAddComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    NgxPermissionsModule.forRoot(),
    AppRoutingModule,
    NgMetro4Module,
    ChartsModule,
    FormsModule
  ],

  providers: [
    ApiProvider,
    AuthProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
