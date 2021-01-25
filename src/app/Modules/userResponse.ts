export class userResponse { 
    public id:number;
    public title:string;
    public firstName:string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public role: string;
    public created: string;
    public avatar: string;
    public updated:string;
    public isVerified:boolean;
    public jwtToken:string;
    constructor(id:number, title:string, firstName:string, lastName: string, email: string,role: string, created: string,avatar: string,updated:string,isVerified:boolean,jwtToken:string ) {
      this.id = id;
      this.title=title;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.role = role;
      this.created = created;
      this.avatar=avatar;
      this.updated=updated;
      this.isVerified=isVerified;
      this.jwtToken=jwtToken;
    }
  }