import {Component, OnInit, ViewChild} from '@angular/core';
import {ParkingLot} from "../../../parkingLot/model/ParkingLot/parking-lot";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ParkingLotService} from "../../../parkingLot/services/parkingLot/parking-lot.service";
import * as _ from "lodash";
import {Owner} from "../../../parkingLot/model/owner/owner";
import {Reservation} from "../../model/reservation";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {


  reservationData: Reservation;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'driverId', 'parkingLotId', 'durationTime','dateBooking', 'actions'];

  @ViewChild('reservationForm', {static: false})
  reservationForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private reservationService: ReservationService) {
    this.reservationData = {} as Reservation;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllReservation();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllReservation() {
    this.reservationService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Reservation) {
    this.reservationData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.reservationForm.resetForm();
  }

  deleteItem(id: number) {
    this.reservationService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Reservation) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addReservation() {
    this.reservationData.id = 0;
    this.reservationService.create(this.reservationData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateReservation() {
    this.reservationService.update(this.reservationData.id, this.reservationData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((o: Reservation) => {
            if (o.id === response.id) {
              o = response;
            }
            return o;
          });
      });
  }

  onSubmit() {
    if (this.reservationForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateReservation();
      } else {
        console.log('about to add');
        this.addReservation();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }


}
