export class userForRegister { 
    public firstName:string;
    public lastName: string;
    public email: string;
    public gender: boolean;
    public phoneNumber:string;
    public location:string;
    public password: string;
    public confirmPassword: string;
    public acceptTerms:boolean;
    constructor(firstName:string, lastName: string, email: string,gender: boolean,phoneNumber:string,location:string,password: string, confirmPassword: string,acceptTerms:boolean ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.gender = gender;
      this.phoneNumber=phoneNumber;
      this.location=location;
      this.password = password;
      this.confirmPassword=confirmPassword;
      this.acceptTerms=acceptTerms;
    }
  }