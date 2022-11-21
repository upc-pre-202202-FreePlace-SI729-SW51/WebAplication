import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FreePlace-Application-Web';
  options = [
    { path: '/owner', title: 'owner'},
    { path: '/parkingLot', title: 'parkingLot'},
    { path: '/creditCard', title: 'creditCard'},
    { path: '/driver', title: 'driver'},
    { path: '/reservation', title: 'reservation'},
    { path: '/parkingSlips', title: 'parkingSlips'},





  ]
}
