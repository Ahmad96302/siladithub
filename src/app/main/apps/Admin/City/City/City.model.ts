import { Country } from './../../Country/Country/Country.model';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class City
{
    id: string;
    name: string;
    handle: string;
    countryId:number;
    country:Country;
    /**
     * Constructor
     *
     * @param City
     */
    constructor(City?)
    {
        City = City || {};
        this.id = City.id || 0;
        this.name = City.name || '';
        this.handle = City.handle || FuseUtils.handleize(this.name);
        this.country=City.Country;
        this.countryId=City.countryId;
    }

}
