import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ParkingLotComponent} from "./parkingLot/pages/parking-lot/parking-lot.component";
import {HistoryComponent} from  "./booking/pages/history/history.component";
import {ReservationComponent} from "./booking/pages/reservation/reservation.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'parking-lots', component: ParkingLotComponent},
  { path: 'reservation-history', component: HistoryComponent},
  {path: 'reservation', component: ReservationComponent},
  { path: '', redirectTo: 'parking-lots', pathMatch: 'full'},
  {path:'reservation', component:ReservationComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
