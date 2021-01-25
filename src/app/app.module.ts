import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AlertifyService } from './../@fuse/services/alertify.service';
import {offersService } from './main/sample/services/Offers.service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { AuthGuardService } from './main/pages/authentication/Auth/auth-guard.service';
import { FakeDbService } from './fake-db/fake-db.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
  } from 'angularx-social-login';
import { SignalRService } from '@fuse/services/signal-r.service';
import {  MatSnackBarModule } from '@angular/material/snack-bar';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule), canActivate: [AuthGuardService]
    },
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path      : '**', canActivate: [AuthGuardService],
        redirectTo: 'sample'
    }
   
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        InfiniteScrollModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        SocialLoginModule,
        // App modules
        LayoutModule,
        SampleModule,
        
    
       
    ],
    providers:[
        AlertifyService,
        AuthGuardService,
        SignalRService,
        offersService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    '273014952015-pvcashtgqjsn4rim61817j31bfg1l41q'
                  )
                },
                 {
                   id: FacebookLoginProvider.PROVIDER_ID,
                   provider: new FacebookLoginProvider('437607590765358')
                 }
              ]
            } as SocialAuthServiceConfig,
          }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
platformBrowserDynamic().bootstrapModule(AppModule);
