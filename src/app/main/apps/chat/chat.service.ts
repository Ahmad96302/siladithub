import { MessageforSignalR } from './../../../Modules/messageforSignalR';
import { getgetUserChats, Api, getContext, getuseruser, postmessage, getContext1 } from './../../../../URL_API';
import { MessageForCreationDto } from './../../../Modules/MessageForCreationDto';
import { AuthService } from './../../pages/authentication/Auth/auth.service';
import { userDetails } from './../../../Modules/userDetails';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { SignalRService } from '@fuse/services/signal-r.service';
import { CONNREFUSED } from 'dns';

@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private AuthService:AuthService,
        private signalRService:SignalRService
    )
    {

        this.UserDetails=this.AuthService.userDetails();

        // Set the defaults
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getChats(),
                this.getUser()
            ]).then(
                ([contacts, chats, user]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    contactIdS : string ;
    userids : string ;
    chatstringid:string
    UserDetails:userDetails;
    getChat(contactId): Promise<any>
    {
        const chatItem = this.user.chatList.find((item) => {
          this.chatstringid=item.id
            return item.contactId === contactId;
        });

        // Create new chat, if it's not created yet.
        if ( !chatItem )
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }
        this.UserDetails=this.AuthService.userDetails();
       this.contactIdS=contactId+ '';
       this.userids = this.UserDetails.id+'';
       var option = {headers : { 
       'id': this.chatstringid,
       'Authorization': 'Bearer ' + this.token,
       'content-Type' : 'application/json'}};
        return new Promise((resolve, reject) => {
            this._httpClient.get(getContext,option)
                .subscribe((response: any) => {
                    const chat = response;
                    const chatContact = this.contacts.find((contact) => {
                        return contact.id === contactId;
                    });
                    const chatData = {          
                        chatId : chat[0].id,
                        dialog : chat[0].dialog,
                        contact: chatContact      
                    };
                    this.onChatSelected.next({...chatData});
                }, reject);

        });

    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id    : chatId,
                dialog: []
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.name,
                unread         : null
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);
            
            // Post the created chat
            this._httpClient.post('api/chat-chats', {...chat})
                .subscribe((response: any) => {

                    // Post the new the user data
                    this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                        .subscribe(newUserData => {

                            // Update the user data from server
                            this.getUser().then(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
                }, reject);
        });
    }

    /**
     * Select contact
     *
     * @param contact
     */
    selectContact(contact): void
    {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void
    {
        this.user.status = status;
    }

    /**
     * Update user data
     *
     * @param userData
     */
    updateUserData(userData): void
    {
        this._httpClient.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                    this.user = userData;
                }
            );
    }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
         date: Date = new Date();  

    MessageForCreation:MessageForCreationDto;
    messageforsignalR:MessageforSignalR;
    SenderId : number;
    SenderIdstring : string;
    token :string = sessionStorage.getItem('key');
    updateDialog(chatId, dialog,contact): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };
        
           var option = {  'headers': {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
              }}; 
            this.SenderId=+this.UserDetails.id;
            this.messageforsignalR= new MessageforSignalR(this.SenderId,contact.id,dialog.message,this.UserDetails.fullName);
            this.MessageForCreation= new MessageForCreationDto(contact.id,this.SenderId,this.UserDetails.fullName,dialog.message,dialog.time,chatId);
            this.signalRService.sendMessage(this.messageforsignalR); 
            this._httpClient.post(postmessage,this.MessageForCreation,option)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
              
                 
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */

    getContacts(): Promise<any>
    {
        var option = {  'headers': {
            'id': this.UserDetails.id,
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }};   
        return new Promise((resolve, reject) => {
            this._httpClient.get(getContext1,option)
                .subscribe((response: any) => {
                    resolve(response);

                }, reject);
        });
    }

    /**
     * Get chats
     *
     * @returns {Promise<any>}
     */
    getChats(): Promise<any>
    {

        var option = {  'headers': {
            'id': this.UserDetails.id,
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }}; 
        return new Promise((resolve, reject) => {
            this._httpClient.get(getgetUserChats,option)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get user
     *
     * @returns {Promise<any>}
     */
    getUser(): Promise<any>
    {

        var option = {  'headers': {
            'id': this.UserDetails.id, 
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }}; 
        return new Promise((resolve, reject) => {
            this._httpClient.get(getuseruser,option)
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }
}
