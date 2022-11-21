import {Component, OnInit, ViewChild} from '@angular/core';
import {Reservation} from "../../model/reservation";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../services/reservation.service";
import * as _ from "lodash";
import {ParkingSlips} from "../../model/parking-slips";
import {ParkingSlipsService} from "../../services/parking-slips.service";

@Component({
  selector: 'app-parking-slips',
  templateUrl: './parking-slips.component.html',
  styleUrls: ['./parking-slips.component.css']
})
export class ParkingSlipsComponent implements OnInit {


  parkingSlipsData: ParkingSlips;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'reservationId', 'entryTime', 'exitTime','totalCost', 'actions'];

  @ViewChild('parkingSlipsForm', {static: false})
  parkingSlipsForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private parkingSlipsService: ParkingSlipsService) {
    this.parkingSlipsData = {} as ParkingSlips;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllParkingSlips();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllParkingSlips() {
    this.parkingSlipsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: ParkingSlips) {
    this.parkingSlipsData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.parkingSlipsForm.resetForm();
  }

  deleteItem(id: number) {
    this.parkingSlipsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: ParkingSlips) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addParkingSlips() {
    this.parkingSlipsData.id = 0;
    this.parkingSlipsService.create(this.parkingSlipsData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateParkingSlips() {
    this.parkingSlipsService.update(this.parkingSlipsData.id, this.parkingSlipsData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((o: ParkingSlips) => {
            if (o.id === response.id) {
              o = response;
            }
            return o;
          });
      });
  }

  onSubmit() {
    if (this.parkingSlipsForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateParkingSlips();
      } else {
        console.log('about to add');
        this.addParkingSlips();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }


}
