import {Component, OnInit, ViewChild} from '@angular/core';
import {CreditCard} from "../../model/credit-card";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CreditCardService} from "../../services/credit-card.service";
import * as _ from "lodash";
import {Owner} from "../../../parkingLot/model/owner/owner";
import {Driver} from "../../model/driver";
import {DriverService} from "../../services/driver.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {


  driverData: Driver;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'creditCard', 'fullName', 'contact','vehicle', 'actions'];

  @ViewChild('driverForm', {static: false})
  driverForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private driverService: DriverService) {
    this.driverData = {} as Driver;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllDriver();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllDriver() {
    this.driverService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Driver) {
    this.driverData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.driverForm.resetForm();
  }

  deleteItem(id: number) {
    this.driverService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Driver) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addDriver() {
    this.driverData.id = 0;
    this.driverService.create(this.driverData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateDriver() {
    this.driverService.update(this.driverData.id, this.driverData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((o: CreditCard) => {
            if (o.id === response.id) {
              o = response;
            }
            return o;
          });
      });
  }

  onSubmit() {
    if (this.driverForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateDriver();
      } else {
        console.log('about to add');
        this.addDriver();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
