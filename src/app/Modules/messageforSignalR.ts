export class MessageforSignalR {
    public SenderId: number
    public RecipientId: number
    public Content: string
    public fullname: string
    constructor( SenderId: number,RecipientId: number,Content: string,fullname: string){
         this.SenderId=SenderId;
         this.RecipientId=RecipientId;
         this.Content=Content;
         this.fullname=fullname;
     }
 }