import { CurrencyCodesApi } from './../../../../../URL_API';
import { MainCurrencyModule } from './main-currency.module';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mainCurrencyApi } from 'URL_API';
@Injectable({
  providedIn: 'root'
})
export class PrimeryCurrencyService  {
    token : any = sessionStorage.getItem('key');
  private MainCurrencyModule : MainCurrencyModule;


  option ={headers : {'content-Type' : 'application/json','Authorization' :'Bearer '+this.token }}
  testoption ={headers : {'content-Type' : 'application/json'}}
  constructor(private http: HttpClient){


  this.http.get(mainCurrencyApi,this.option).subscribe((currency: MainCurrencyModule)=>{
  this.MainCurrencyModule = currency;  
  })
}

 GetCods(){
 return  this.http.get(CurrencyCodesApi,this.option);
   
}
 getMaincurrency() {
 return  this.http.get( mainCurrencyApi,this.option);
}
getmyMaincurrency(){
  this.getMaincurrency();
  return this.MainCurrencyModule;
}

updateMainCurrency(MainCurrencyModule:MainCurrencyModule){
  MainCurrencyModule.id=this.MainCurrencyModule.id;
  this.http.put<MainCurrencyModule>(mainCurrencyApi,MainCurrencyModule,{headers : {'content-Type' : 'application/json','Authorization' :'Bearer '+this.token }}).subscribe(()=>{
 });
this.MainCurrencyModule=MainCurrencyModule;
}




}
