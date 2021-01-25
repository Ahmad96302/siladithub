import { getRates } from './../../../../../../../URL_API';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChatService } from 'app/main/apps/chat/chat.service';

@Component({
    selector     : 'chat-contact-sidenav',
    templateUrl  : './contact.component.html',
    styleUrls    : ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatContactSidenavComponent implements OnInit, OnDestroy
{
  rating:number = 1;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  contact: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _chatService: ChatService,
        private http: HttpClient

    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

    }
    async getRate(data){
        var options= {
            'headers': 
            {   'id': data,
                'Authorization': 'Bearer '+sessionStorage.getItem('key'),
                'Content-Type': 'application/json'
              }
            }
           await this.http.get(getRates,options).subscribe(response => {
               this.rating=response['rate'];
           })
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._chatService.onContactSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contact => {
                this.contact = contact;
               // this.getRate(''+4);
               if(this.contact){
                 this.getRate(''+this.contact.id);
               }
               else{
               }
            });
            

    }
    onRatingChanged(rating){
        this.rating = rating;
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
}export enum StarRatingColor {
    primary = "primary",
    accent = "accent",
    warn = "warn"
  }
  
