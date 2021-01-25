import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class currency
{
    id: string;
    code: string;
    handle: string;
    logo:string;
    order:number;
    buy:number;
    sell:number;
    /**
     * Constructor
     *
     * @param currency
     */
    constructor(Currency?)
    {
        Currency = Currency || {};
        this.id = Currency.id|| 0;
        this.code = Currency.code || '';
        this.handle = Currency.handle || FuseUtils.handleize(this.code);
        this.logo=Currency.logo;
        this.order=Currency.order;
        this.buy=Currency.buy;
        this.sell= Currency.sell;

    }

}
