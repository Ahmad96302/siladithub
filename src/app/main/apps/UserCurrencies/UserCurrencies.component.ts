import { UserCurrenciesService } from './UserCurrencies.service';
import { Component, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
import { currency } from '../Admin/currencies/currency/currency.model';

@Component({
    selector     : 'user-UserCurrencies',
    templateUrl  : './UserCurrencies.component.html',
    styleUrls    : ['./UserCurrencies.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UserCurrenciesComponent
{
    view: string;
currencies:currency[];

    constructor(
        UserCurrenciesService:UserCurrenciesService
    )
    {
        this.currencies=UserCurrenciesService.currencies;
        // Set the defaults
        this.view = 'preview';


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the view
     */
    toggleView(): void
    {
  
    }
}
