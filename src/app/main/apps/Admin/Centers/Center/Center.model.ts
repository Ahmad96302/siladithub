import { City } from './../../City/City/City.model';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Center
{
    id: string;
    name: string;
    handle: string;
    city:City;
    cityId:number;
    /**
     * Constructor
     *
     * @param Center
     */
    constructor(Center?)
    {
        Center = Center || {};
        this.id = Center.id || 0;
        this.name = Center.name || '';
        this.handle = Center.handle || FuseUtils.handleize(this.name);
        this.city=Center.City;
        this.cityId=Center.cityId;
    }

}
