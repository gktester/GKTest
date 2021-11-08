import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, JwtService, SnackBarService, UserService } from '../core/services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  errorMsg = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _location: Location,
    private snackbarService: SnackBarService
  ) {
    this.customerForm = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  get customerName() {
    return this.customerForm.get('customerName');
  }
  get age() {
    return this.customerForm.get('age');
  }
  get address() {
    return this.customerForm.get('address');
  }


  onSubmit() {
    const userData: any = {
      customerName: this.customerForm.value.customerName,
      customerAge: this.customerForm.value.age,
      customerAddress: this.customerForm.value.address,
    }
    this.userService.saveCustomerInfo(userData).subscribe((res: any) => {
      this.snackbarService.success('Successfully Created!');
      this.customerForm.reset();
    }, (err) => {
      this.errorMsg = err.error.error || '';
    });
  }

  gobacktoDashboard() {
    this._location.back();
  }

}
