import { IvyCarouselModule } from './../../carousel/carousel.module';
import { UserCurrenciesService } from './../apps/UserCurrencies/UserCurrencies.service';
import { offersService } from './services/Offers.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseConfirmDialogModule } from './../../../@fuse/components/confirm-dialog/confirm-dialog.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { AuthGuardService } from './../pages/authentication/Auth/auth-guard.service';
import { SampleComponent } from './sample.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path     : 'sample',canActivate: [AuthGuardService],
        component: SampleComponent,
        resolve  : {
            data: offersService
        },
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        IvyCarouselModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
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
        MatTabsModule,
        MatSnackBarModule,
        FuseConfirmDialogModule,
        NgxChartsModule,
        FuseSharedModule
        
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
