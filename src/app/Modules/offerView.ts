export class OfferView {
    public  id :number  
    public  Location:string
    public  UserId :number
    public  Username :string
    public  AccepterName:string
    public  CountryName :string
    public  currency:string
    public  Status :number
    public  Amount :number
    public  CityId :number
    public  City :string
    public  Center :string
    public  country :string
    public  Acepted :boolean
    constructor(id :number,Location:string,UserId :number,Username :string,AccepterName:string,CountryName :string,currency:string,Status :number,Amount :number,CityId :number,City :string,Center :string,country :string,Acepted :boolean){
        this.id=id;
        this.Location=Location;
        this.UserId=UserId;
        this.Username=Username;
        this.AccepterName=AccepterName;
        this.CountryName=CountryName;
        this.currency=currency;
        this.Status=Status;
        this.Amount=Amount;
        this.CityId=CityId;
        this.City=City;
        this.Center=Center;
        this.country=country;
        this.Acepted=Acepted;
    }
}

