import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './../../../../../@fuse/services/alertify.service';
import { AuthService } from './../../../pages/authentication/Auth/auth.service';
import { userDetails } from './../../../../Modules/userDetails';
import { AuthGuardService } from './../../../pages/authentication/Auth/auth-guard.service';
import { MessageForCreationDto } from './../../../../Modules/MessageForCreationDto';
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { ChatService } from 'app/main/apps/chat/chat.service';
import { SignalRService } from '@fuse/services/signal-r.service';
import { tr } from 'date-fns/locale';
import { postSkip } from 'URL_API';
import { locale as english } from './../../../../i18n/en';
import { locale as turkish } from './../../../../i18n/tr';
@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    modalIsOpen = '';
    modalTitle = 'scroll to update';
    hideButton:boolean;
    modalScrollDistance = 2;
    modalScrollThrottle = 50;
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _chatService: ChatService,
        private signalRService:SignalRService,
        private _ngZone: NgZone,
        private AuthService:AuthService,
        private alertify:AlertifyService,
        private HttpClient:HttpClient,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService


    )
    {
        this.hideButton=false;
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        // Set the private defaults
        this.subscribeToEvents(); 
        this._unsubscribeAll = new Subject();
        this.userDetails =this.AuthService.userDetails();
    }
    token :string = sessionStorage.getItem('key');
  async  fetchOldMessages() {
        var option = {  'headers': {
            'id':this.selectedChat.chatId+'',
            'skip':this.dialog.length+'',
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        }};   
        await this.HttpClient.get(postSkip,option).subscribe((response:any) => {            
            response[0].dialog.forEach(element => {
                this.dialog.unshift(element);  
            });
            if(response[0].dialog.length==0){
                this.hideButton=true;
            }
        });
        
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    
        this.user = this._chatService.user;
        this._chatService.onChatSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.contact = chatData.contact;
                    this.dialog = chatData.dialog;
                    this.readyToReply();
                }
            });
       
            if(this.dialog.length > 5){
                this.hideButton=true;
            }
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean
    {
        return (
            message.who === this.contact.id &&
            ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
    }

    /**
     * Select contact
     */
    selectContact(): void
    {
        this._chatService.selectContact(this.contact);
        
    }

    /**
     * Ready to reply
     */
    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void
    {
        speed = speed || 400;
        if ( this.directiveScroll )
        {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * Reply
     */
    reply(event): void
    {
        event.preventDefault();

        if ( !this.replyForm.form.value.message )
        {
            return;
        }

        // Message
        const message = {
            who    : this.user.id,
            message: this.replyForm.form.value.message,
            time   : new Date().toISOString()
        };
 
        // Add the message to the chat
        this.dialog.push(message);

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        this._chatService.updateDialog(this.selectedChat.chatId, message, this.contact).then(response => {
            this.scrollToBottom();
        });
    }
    userDetails:userDetails;
    private subscribeToEvents(): void {  
        
        this.signalRService.messageReceived.subscribe((message1: any) => {  
          this._ngZone.run(() => {
              console.log('New Message')  
            if (message1.senderId == this.selectedChat.contact.id) {
                  
                const message = {
                    who    : message1.senderId,
                    message: message1.content,
                    time   : new Date().toISOString()
                };
              this.dialog.push(message);  
              this.scrollToBottom();
            }  
          });  
        });  
      }  
}
