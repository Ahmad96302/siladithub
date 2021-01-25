import { Location } from '@angular/common';
import { userResponse } from '../../../../Modules/userResponse';
import { City } from '../../Admin/City/City/City.model';
import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';
import { Country } from '../../Admin/Country/Country/Country.model';
import { Center } from '../../Admin/Centers/Center/Center.model';

export enum offerType {
    offer = 0,
    order = 1

}

export class offer {
    public id:number;
    public userId: string;
    public user: userResponse;
    public amount: number;
    public centerId:number;
    public center: Center;
    public cityId:number;
    public country: Country;
    public city: City;
    public offerType:offerType;
    public status :string;
    public startDate:string;
    public location:string;
    public currency:string;
      /**
     * Constructor
     *
     * @param Offers
     */
    constructor(Offers?) {
       
        Offers=Offers||{},
        this.id=Offers.id||0,
        this.amount=Offers.amount,
        this.center=Offers.center,
        this.city=Offers.city,
        this.startDate=Offers.startDate,
        this.location=Offers.location,
        this.userId=Offers.UserId,
        this.cityId=Offers.cityId,
        this.centerId=Offers.centerId,
        this.currency=Offers.currency,
        this.offerType=Offers.offerType
    }
   }