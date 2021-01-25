import { NgSelect2Module } from 'ng-select2';
import { OrderuserService } from './Order/Order.service';
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
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



import { SignalRService } from '@fuse/services/signal-r.service';
import { OrdersComponent } from './Orders/Orders.component';
import { OrderComponent } from './Order/Order.component';

import { OrdersService } from './Orders/Orders.service';

const routes: Routes = [

    {
        path     : 'Orders',
        component: OrdersComponent,
        resolve  : {
            data: OrdersService
        },
    },
    {
        path     : 'Orders/:id',
        component: OrderComponent,
        resolve  : {
            data: OrderuserService
        }
    },
    {
        path     : 'Orders/:id',
        component: OrderComponent,
        resolve  : {
            data: OrderuserService
        }
    },
    
];

@NgModule({
    declarations: [
        OrdersComponent,
        OrderComponent
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
        MatSnackBarModule,
        MatTableModule,
        TranslateModule,
        MatTabsModule,
        FuseConfirmDialogModule,
        NgSelect2Module,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [

        SignalRService,
        OrdersService,
        OrderuserService
    ]
})
export class OffersModule
{
}
