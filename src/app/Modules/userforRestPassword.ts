export class userforRestPassword { 
    public token: string;
    public password: string;
    public passwordConfirm: string;
    constructor(token: string, password: string,passwordConfirm: string) {
      this.token = token;
      this.password = password;
      this.passwordConfirm = passwordConfirm;
    }
  }