import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services';
import {Location} from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  customerdataSource: any;
  constructor(
    private  userService : UserService,
    private _location: Location
  ) { }

  ngOnInit(): void {
   this.userService.getOrderDetails().subscribe((response: any) => {
    console.log(response);
    this.customerdataSource = response;
  });;
  }

  gobacktoDashboard(){
    this._location.back();
  }

}
