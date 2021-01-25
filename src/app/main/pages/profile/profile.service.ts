import { myOfferApi, Profileinfo, Profileimage, CloseOffer, SuccessOffer, myorderandprofile, getCounts, myOfferAccepted } from './../../../../URL_API';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProfileService implements Resolve<any>
{
    timeline: any;
    about: any;
    photosVideos: any;

    Offers: any[];
    onOffersChanged: BehaviorSubject<any>;

    token : any = sessionStorage.getItem('key');
    option = {headers : { 'Authorization' : 'Bearer ' + this.token }};

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    )
    {
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
        this.onOffersChanged=new BehaviorSubject({});
    }
    
    CloseOffer(id){
        return this._httpClient.post(CloseOffer,id ,this.option);
    }
    SuccessOffer(id){
        return this._httpClient.post(SuccessOffer,id ,this.option);
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
                this.getTimeline(),
                this.getAbout(),
                this.getPhotosVideos(),
                this.getOffers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    /**
     * Get Offers
     *
     * @returns {Promise<any>}
     */
    getOffers(): Promise<any>
    {
        
        return new Promise((resolve, reject) => {
            this._httpClient.get(myorderandprofile,this.option)
                .subscribe((response: any) => {
                    this.Offers = response;
                    this.Offers.forEach(element => {
                        if(element.offerType == 0)
                        {
                            element.offerType = 'offer';
                        }
                        else if(element.offerType == 1){
                            element.offerType = 'Order';
                        }     
                       });
                    this.onOffersChanged.next(this.Offers);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-about')
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

    updateProfileImage(form): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post(Profileimage,form,this.option)
                .subscribe((Response: any) => {
                resolve(Response);
                }, reject);
        });
    }

    updateinfo(data){
        return new Promise((resolve, reject) => {

            this._httpClient.post(Profileinfo,data,this.option)
            .subscribe((about: any) => {
                this.about = about;
                this.aboutOnChanged.next(this.about);
                resolve(this.about);
                }, reject);
        });
    }
    getcount5(){
     return  this._httpClient.get(getCounts,this.option);
    }


}
