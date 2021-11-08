import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services';
import {Location} from '@angular/common';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  customerDataSource: any;
  constructor(
    private  userService : UserService,
    private _location: Location
  ) { }

  ngOnInit(): void {
   this.userService.getOrderDetails().subscribe((response: any) => {
    console.log(response);
    this.customerDataSource = response;
  });;
  }

  gobacktoDashboard(){
    this._location.back();
  }

}
