import { state } from '@angular/animations';
import { MessageforSignalR } from './../../app/Modules/messageforSignalR';
import { userDetails } from './../../app/Modules/userDetails';
import { AuthService } from './../../app/main/pages/authentication/Auth/auth.service';
import { MessageForCreationDto } from './../../app/Modules/MessageForCreationDto';
import { Injectable, EventEmitter } from '@angular/core';
import { SignalRApi, hubconnection } from './../../URL_API';
import * as signalR from "@aspnet/signalr";
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  

@Injectable()  
export  class SignalRService {
 
    messageReceived = new EventEmitter<MessageForCreationDto>();  
    connectionEstablished = new EventEmitter<Boolean>();  
    OfferReceived = new EventEmitter<any>();
    newNotfiy = new EventEmitter<any>();
    private connectionIsEstablished = false;  
    userDetails:userDetails
    _hubConnection = hubconnection;
    id =sessionStorage.getItem('id')
    //  options = {
    //     transport: signalR.HttpTransportType.ServerSentEvents ,
    //     logging: signalR.LogLevel.Trace, 
    // };
    constructor() {          
           if(sessionStorage.getItem('key')){ }
      }  
      StartConnection(){
        if(sessionStorage.getItem('key')){
        this._hubConnection.start();
        this.addtoServer(parseInt(this.id));
        this.registerOnServerEvents();  
        this.registerOnServerEvents1(); 
        this.registerOnServerEvents2();
        } 
      }   

      
      sendMessage(message: MessageforSignalR) {  
        this._hubConnection.invoke('NewMessage', message);  
      }  
      NewOffer(Offer) {  
        this._hubConnection.invoke('NewOffer',Offer);  
      } 
      sendRequset(Offer,x:number) {  
        this._hubConnection.invoke('newNotfiy',Offer,x);  
      } 
   
   
      public Checkconnection(){
        if(this._hubConnection.state== signalR.HubConnectionState.Disconnected){
          this.StartConnection();
        }
    
      }

  
    

      public addtoServer = (id:number) => {
 
        this._hubConnection.on("WelcomeMethodName", (data) => {
          
            this._hubConnection.invoke("GetDataFromClient",id, data).catch(err => console.log(err));
       });
    }
      
      private registerOnServerEvents(): void {  
        this._hubConnection.on('MessageReceived', (data: any) => {  
          this.messageReceived.emit(data);  
        });  
        
    
}  
private registerOnServerEvents1(): void {  
    this._hubConnection.on('OfferReceived', (data: any) => {  
      this.OfferReceived.emit(data);  
    });  
} 
private registerOnServerEvents2(): void {  
    this._hubConnection.on('newNotfiy', (data: any) => {  
      this.newNotfiy.emit(data);  
    });
} 
}
