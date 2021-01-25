import { UserCurrenciesService } from './UserCurrencies.service';
import { UserCurrenciesComponent } from './UserCurrencies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';
import { FuseHighlightModule } from '@fuse/components';

import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path     : 'UserCurrencies',
        component: UserCurrenciesComponent,
        resolve:{
            data:UserCurrenciesService
        }
    }
];

@NgModule({
    declarations: [
        UserCurrenciesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseDemoModule,
        FuseHighlightModule,
    ],
    providers:[
        UserCurrenciesService
    ]
})
export class UICardsModule
{
}
