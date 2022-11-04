import {Component, OnInit, ViewChild} from '@angular/core';
import {Parkinglot} from "../../model/parkinglot";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ParkinglotService} from "../../service/parkinglot/parkinglot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {


  invalidUrl: string = '';

  parkingLotData: Parkinglot;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'location', 'hoursOfAttention', 'costHours','reservation'];

  @ViewChild('parkingLotForm', {static: false})
  parkingLotForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private parkingLotService: ParkinglotService,
              private route: ActivatedRoute,
              private router: Router) {
    this.parkingLotData = {} as Parkinglot;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllParkingLot();
    this.invalidUrl = this.route.snapshot.url[0].path;

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  navigateToReservation() {
    this.router.navigate(['reservation']);
  }

  getAllParkingLot() {
    this.parkingLotService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  addParkingLot() {
    this.parkingLotData.id = 0;
    this.parkingLotService.create(this.parkingLotData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateParkingLot() {
    this.parkingLotService.update(this.parkingLotData.id, this.parkingLotData)
        .subscribe((response: any) => {
          this.dataSource.data = this.dataSource.data
              .map((o: Parkinglot) => {
                if (o.id === response.id) {
                  o = response;
                }
                return o;
              });
        });
  }

  onSubmit() {
    if (this.parkingLotForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateParkingLot();
      } else {
        console.log('about to add');
        this.addParkingLot();
      }
    } else {
      console.log('Invalid data');
    }
  }


}
