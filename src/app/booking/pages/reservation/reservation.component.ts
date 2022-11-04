import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";


interface Card {
  value: string;
  type: string;
}


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  card: Card[] = [
    {value: '0', type: 'Visa'},
    {value: '1', type: 'Debit'},
    {value: '1', type: 'Mastercard'},
  ];

  constructor(private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }

  navigateToParkingLots(){
    this.router.navigate(['parking-lots']);
  }
}
