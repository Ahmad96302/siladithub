export class MessageForCreationDto {
    public RID:number
    public who: number
    public fullName:string
    public message: string
    public Time: string
    public chatId:string

     constructor(RID:number, who: number,fullName:string,message: string,Time: string,chatId:string){
        this.RID=RID; 
        this.who=who;
        this.fullName=fullName;
         this.message=message;
         this.Time=Time;
         this.chatId=chatId;
     }
}
