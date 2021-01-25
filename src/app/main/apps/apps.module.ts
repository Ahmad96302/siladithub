import { AuthguardAdminService } from './../pages/authentication/Auth/authguardAdmin.service';
import { OffersModule } from './Offers/Offers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuardService } from './../pages/authentication/Auth/auth-guard.service';
import { PagesModule } from './../pages/pages.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { OffersComponent } from './offers/offers/offers.component';
import { OfferComponent } from './offers/offer/offer.component';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';

const routes = [


    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuardService]
    },
    {
        path        : 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule), canActivate: [AuthGuardService]
    },
    {
        path        : 'Admin',
        loadChildren: () => import('./Admin/Admin.module').then(m => m.AdminModule), canActivate: [AuthguardAdminService]
    },
    {
        path        : 'Offer',
        loadChildren: () => import('./Offers/Offers.module').then(m => m.OffersModule), canActivate: [AuthGuardService]
    },
    {
        path        : 'Order',
        loadChildren: () => import('./Orders/Orders.module').then(m => m.OffersModule), canActivate: [AuthGuardService]
    },
    {
        path: 'UserCurrencies',
        loadChildren: () => import('./UserCurrencies/UserCurrencies.module').then(m => m.UICardsModule), canActivate: [AuthGuardService]

    }

    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatSelectModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatButtonToggleModule
    ],
    declarations: [ ]
})

export class AppsModule
{
}
