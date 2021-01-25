
export class MainCurrencyModule { 
  public id:number;
  public symbol: string;
  public sell: number;
  public buy: number;
  public inGlobalStocks: Boolean;
  constructor(id:number, Symbol: string, buy: number,sell: number, InGlobalStocks:boolean ) {
    this.id = id;
    this.symbol = Symbol;
    this.buy = buy;
    this.sell = sell;
    this.inGlobalStocks=InGlobalStocks;
  }
}
