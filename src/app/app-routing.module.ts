import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {OwnerComponent} from "./parkingLot/pages/owner/owner.component";
import {ParkingLotComponent} from "./parkingLot/pages/parking-lot/parking-lot.component";
import {CreditCardComponent} from "./profile/pages/credit-card/credit-card.component";
import {DriverComponent} from "./profile/pages/driver/driver.component";
import {ReservationComponent} from "./booking/pages/reservation/reservation.component";

const routes: Routes = [
  {path:'parkingLot',component:ParkingLotComponent},
  {path:'creditCard',component:CreditCardComponent},
  {path:'driver',component:DriverComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'parkingSlips',component:ParkingLotComponent},

  {path:'owner',component:OwnerComponent},
  { path: '', redirectTo: 'parking-lots', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
