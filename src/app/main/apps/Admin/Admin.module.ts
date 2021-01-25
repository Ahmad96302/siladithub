import { TranslateModule } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './../../../../@fuse/services/translation-loader.service';
import { NgSelect2Module } from 'ng-select2';
import { PrimeryCurrencyService } from './Primarycurrency/PrimeryCurrency.service';
import { PrimarycurrencyComponent } from './Primarycurrency/Primarycurrency.component';
import { FuseConfirmDialogModule } from './../../../../@fuse/components/confirm-dialog/confirm-dialog.module';
import { FuseConfirmDialogComponent } from './../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { currencyService } from './currencies/currency/currency.service';
import { currencyComponent } from './currencies/currency/currency.component';
import { currenciesService } from './currencies/currencies/currencies.service';
import { CentersService } from './Centers/Centers/Centers.service';
import { CenterService } from './Centers/Center/Center.service';
import { CentersComponent } from './Centers/Centers/Centers.component';
import { CenterComponent } from './Centers/Center/Center.component';
import { CityService } from './City/City/City.service';
import { CitiesService } from './City/Cities/Cities.service';
import { CityComponent } from './City/City/City.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CountriesComponent } from 'app/main/apps/Admin/Country/Countries/countries.component';
import { countriesService } from 'app/main/apps/Admin/Country/Countries/countries.service';
import { CountryComponent } from 'app/main/apps/Admin/Country/Country/Country.component';
import { CountryService } from 'app/main/apps/Admin/Country/Country/Country.service';
import { CitiesComponent } from './City/Cities/Cities.component';
import { currenciesComponent } from './currencies/currencies/currencies.component';
import { SignalRService } from '@fuse/services/signal-r.service';

const routes: Routes = [
    {
        path     : 'Countries',
        component: CountriesComponent,
        resolve  : {
            data: countriesService
        }
    },
    {
        path     : 'Countries/:id',
        component: CountryComponent,
        resolve  : {
            data: CountryService
        }
    },
    {
        path     : 'Countries/:id/:handle',
        component: CountryComponent,
        resolve  : {
            data: CountryService
        }
    },
    {
        path     : 'Centers/:id/:handle',
        component: CenterComponent,
        resolve  : {
            data: CenterService
        }
    },
    {
        path     : 'Cities',
        component: CitiesComponent,
        resolve  : {
            data: CitiesService
        }
    },
    {
        path     : 'Cities/:id',
        component: CityComponent,
        resolve  : {
            data: CityService
        }
    },
    {
        path     : 'Cities/:id/:handle',
        component: CityComponent,
        resolve  : {
            data: CityService
        }
    },
    {
        path     : 'Centers',
        component: CentersComponent,
        resolve  : {
            data: CentersService
        }
    },
    {
        path     : 'Centers/:id',
        component: CenterComponent,
        resolve  : {
            data: CenterService
        }
    },

    {
        path     : 'currencies',
        component: currenciesComponent,
        resolve  : {
            data: currenciesService
        }
    },
    {
        path     : 'currencies/:id/:handle',
        component: currencyComponent,
        resolve  : {
            data: currencyService
        }
    },
    {
        path     : 'currencies/:id',
        component: currencyComponent,
        resolve  : {
            data: currencyService
        }
    },
    {
        path     : 'PrimaryCurrency',
        component: PrimarycurrencyComponent,
    },
];

@NgModule({
    declarations: [
        CountriesComponent,
        CountryComponent,
        CityComponent,
        CitiesComponent,
        CenterComponent,
        CentersComponent,
        currencyComponent,
        currenciesComponent,
        PrimarycurrencyComponent
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        TranslateModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        FuseConfirmDialogModule,
        NgxChartsModule,
        NgSelect2Module,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers   : [
        countriesService,
        CountryService,
        CitiesService,
        CityService,
        CenterService,
        CentersService,
        currenciesService,
        currencyService,
        SignalRService,
        PrimeryCurrencyService,
        FuseTranslationLoaderService
    ]
})
export class AdminModule
{
}
