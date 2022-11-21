import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import { ParkingLotComponent } from './parkingLot/pages/parking-lot/parking-lot.component';
import {OwnerComponent} from "./parkingLot/pages/owner/owner.component";
import {OwnerService} from "./parkingLot/services/owner/owner.service";
import { CreditCardComponent } from './profile/pages/credit-card/credit-card.component';
import { DriverComponent } from './profile/pages/driver/driver.component';
import { ReservationComponent } from './booking/pages/reservation/reservation.component';
import { ParkingSlipsComponent } from './booking/pages/parking-slips/parking-slips.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ParkingLotComponent,
    OwnerComponent,
    CreditCardComponent,
    DriverComponent,
    ReservationComponent,
    ParkingSlipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatStepperModule,
    MatSelectModule,
    MatSidenavModule
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
