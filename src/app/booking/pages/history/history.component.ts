import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HistoryService} from "../../service/history/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  HistoryData: History;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'Reservation_id', 'Name', 'NameOfParking', 'Location',
    'HoursOfState','CostHours','Total'];

  @ViewChild('reservationHistoryForm', {static: false})
  reservationHistoryForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private historyService:HistoryService) {
    this.HistoryData = {} as History;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllReservationHistory();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

  }

  getAllReservationHistory() {
    this.historyService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

}
