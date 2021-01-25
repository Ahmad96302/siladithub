import { NgSelect2Module } from 'ng-select2';
import { OfferuserService } from './Offer/Offer.service';
import { FuseConfirmDialogModule } from '../../../../@fuse/components/confirm-dialog/confirm-dialog.module';
import { FuseConfirmDialogComponent } from '../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
import { TranslateModule } from '@ngx-translate/core';



import { SignalRService } from '@fuse/services/signal-r.service';
import { OffersComponent } from './offers/offers.component';
import { OfferComponent } from './Offer/Offer.component';

import { OffersService } from './offers/Offers.service';

const routes: Routes = [

    {
        path     : 'Offers',
        component: OffersComponent,
        resolve  : {
            data: OffersService
        },
    },
    {
        path     : 'Offers/:id',
        component: OfferComponent,
        resolve  : {
            data: OfferuserService
        }
    },
    {
        path     : 'Offers/:id',
        component: OfferComponent,
        resolve  : {
            data: OfferuserService
        }
    },
    
];

@NgModule({
    declarations: [
        OffersComponent,
        OfferComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TranslateModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
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
        FuseWidgetModule
    ],
    providers   : [

        SignalRService,
        OffersService,
        OfferuserService
    ]
})
export class OffersModule
{
}
