import { centersApi, citiesApi, OffersApi, CountriesApi, AcceptOffer ,Api} from './../../../URL_API';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'lodash';
import { offer } from '../apps/Offers/Offer/Offermodel';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private token = sessionStorage.getItem('key');
  option ={headers : {'content-Type' : 'application/json','Authorization' :'Bearer '+this.token }}
  OfferOnChanged: BehaviorSubject<offer[]>;
  Offers :offer[];

    
  Cities: any[];
  onCitiesChanged: BehaviorSubject<any>;

  centers: any[];
  oncentersChanged: BehaviorSubject<any>;


  constructor(private _httpClient: HttpClient) { 
    this.OfferOnChanged = new BehaviorSubject(this.Offers);
    this.oncentersChanged=  new BehaviorSubject({});
    this.onCitiesChanged=  new BehaviorSubject({});
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
              this.getoffers(),
              this.getCountries(),
              this.getCenters()
          ]).then(
            ([Offers]) => {
              this.Offers = Offers;
           
              resolve();
          },
              reject
          );
      });
  }
  getoffers(): Promise<offer[]>
  {
      return new Promise((resolve, reject) => {
      
          this._httpClient.get<offer[]>(Api+'Offers')
              .subscribe((Offers: offer[]) => {
                 
                  this.Offers = Offers;
                  this.OfferOnChanged.next(this.Offers);
                  resolve(this.Offers);
              }, reject);
      });
  }


  addOffer(Offer): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.post(OffersApi, Offer,this.option)
              .subscribe((response: any) => {
                  resolve(response);
              }, reject);
      });
  }
  getCountries(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get(CountriesApi,this.option)
              .subscribe((response: any) => {
                  this.Cities = response;
                  this.onCitiesChanged.next(this.Cities);
                  resolve(response);
              }, reject);
      });
  }
  getCenters(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get(centersApi,this.option)
              .subscribe((response: any) => {
                  this.centers = response;
                  this.oncentersChanged.next(this.centers);
                  resolve(response);
              }, reject);
      });
  }
  AcceptOffer1(id,userid) {
    var options = {
        'headers': {
          'Authorization': 'Bearer '+this.token,
          'Content-Type': 'application/json'
        }
      };
      
     return  this._httpClient.post(AcceptOffer ,JSON.stringify({"id":id,"AccountId":userid}), options);
 }

}
