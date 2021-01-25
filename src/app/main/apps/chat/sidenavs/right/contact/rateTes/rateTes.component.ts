import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rateTes',
  templateUrl: './rateTes.component.html',
  styleUrls: ['./rateTes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class RateTesComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }
  @Input('rating') public rating: number = 3;
   @Input('starCount') public starCount: number = 5;
   @Input('color') public color: string = 'accent';
   @Output() public ratingUpdated = new EventEmitter();

   public snackBarDuration: number = 2000;
   public ratingArr = [];
  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
      
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
    primary = "primary",
    accent = "accent",
    warn = "warn"
  }