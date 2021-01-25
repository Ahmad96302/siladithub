import { MainCurrencyModule } from './main-currency.module';
import { PrimeryCurrencyService } from './PrimeryCurrency.service';
import { async } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './../../../../i18n/en';
import { locale as turkish } from './../../../../i18n/tr';
@Component({
  selector: 'app-Primarycurrency',
  templateUrl: './Primarycurrency.component.html',
  styleUrls: ['./Primarycurrency.component.css']
})
export class PrimarycurrencyComponent implements OnInit {
  exampleData: any;
  items: any;
  a :any;
  itemValue: string = 'no';
  hide: any;
  form : FormGroup;
  constructor(private route: ActivatedRoute,
    private currencyService: PrimeryCurrencyService,
    private router: Router,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) {
    this.items = [ {name: 'Yse', value: true} , {name: 'No', value: false}];
    this.hide = true;
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);

  }
  ngOnInit(){
    this.form = new FormGroup({
      'buy': new FormControl(),
      'sell': new FormControl(),
      'inGlobalStocks': new FormControl(),
      'Symbol': new FormControl(),
    });
    this.getSelect();
  }

  async getSelect()
  { 
  await this.currencyService.GetCods().subscribe((cods:string[])=>{
    this.exampleData=  cods;
  })
    await this.currencyService.getMaincurrency().subscribe((MainCurrency:MainCurrencyModule) =>{
       this.form.controls['Symbol'].setValue(MainCurrency.symbol);
       this.form.controls['sell'].setValue(MainCurrency.sell);
       this.form.controls['buy'].setValue(MainCurrency.buy);
       this.form.controls['inGlobalStocks'].setValue(MainCurrency.inGlobalStocks);
    })
 
  }
  result(){
    this.currencyService.updateMainCurrency(this.form.value)
    this.router.navigate(['/Currencies']);
  }
  select(){
    this.hide = this.form.get('inGlobalStocks')?.value;
  }

}
