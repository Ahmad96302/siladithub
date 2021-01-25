import { ThrowStmt } from "@angular/compiler"

export class GetOffersR {
    public id:number
    public accountid: number
    public accountfullname: string
    public price: number
    public center: string
    public country: string
    public city: string
    public location: string
     constructor( id:number,accountid: number,accountfullname: string,price: number,center: string,country: string,city: string,location: string){
         this.id=id;
         this.accountid=accountid;
         this.accountfullname=accountfullname;
         this.price=price;
         this.center=center;
         this.country=country;
         this.city=city;
         this.location=location;
     }
 }