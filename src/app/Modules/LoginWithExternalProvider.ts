
export class LoginWithExternalProvider {
   public firstName: string
   public lastName: string
   public authToken: string
   public email: string
   public loginProvider: string
   public providerKey: string
    constructor( firstName: string,lastName: string,authToken: string,email: string,loginProvider: string,providerKey: string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.authToken=authToken;
        this.email=email;
        this.loginProvider=loginProvider;
        this.providerKey=providerKey;
    }
}