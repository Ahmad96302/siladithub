export class userDetails {
   public id:string;
   public firstName:string;
   public lastName:string;
   public fullName:string;
   public email:string;
   public role:string;
   public created:string;
   public avatar:string;
   public isVerified:string;
   public nbf:number;
   public exp:number;
   public iat:number;
   public phoneNumber:string;
   public location:string;
   constructor(id:string,firstName:string='',lastName:string='',fullName:string='',email:string='',role:string='',created:string='',avatar:string='',isVerified:string='',phoneNumber:string='',location:string=''){
    this.id=id ||'';
    this.firstName=firstName||'';
    this.lastName=lastName||'';
    this.fullName=fullName||'';
    this.email=email||'';
    this.role=role||'';
    this.created=created||'';
    this.avatar=avatar||'';
    this.isVerified=isVerified||'';
    this.phoneNumber=phoneNumber+'';
    this.location=location+'';
   }
}