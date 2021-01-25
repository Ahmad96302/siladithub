import { Identifiers } from '@angular/compiler';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Country
{
    id: string;
    name: string;
    handle: string;
   
    /**
     * Constructor
     *
     * @param Country
     */
    constructor(Country?)
    {
        Country = Country || {};
        this.id = Country.id || 0;
        this.name = Country.name || '';
        this.handle = Country.handle || FuseUtils.handleize(this.name);

    }

}
