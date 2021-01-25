import { FuseWidgetModule } from './../../../../@fuse/components/widget/widget.module';
import { FuseSidebarModule } from './../../../../@fuse/components/sidebar/sidebar.module';
import { MatMenuModule } from '@angular/material/menu';
import { RateTesComponent } from './tabs/about/rateTes/rateTes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RateComponent } from './tabs/about/Rate/Rate.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseConfirmDialogModule } from './../../../../@fuse/components/confirm-dialog/confirm-dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { AuthGuardService } from './../authentication/Auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';


const routes = [
    {
        path     : 'profile', canActivate: [AuthGuardService],
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
    },

];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        RateComponent,
        RateTesComponent,
        ProfileTimelineComponent

    ],
    imports     : [
        RouterModule.forChild(routes),
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        FuseConfirmDialogModule,        
        MatMenuModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
