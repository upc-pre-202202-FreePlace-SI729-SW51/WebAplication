import {Component, OnInit, ViewChild} from '@angular/core';
import {Owner} from "../../model/owner/owner";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OwnerService} from "../../services/owner/owner.service";
import * as _ from "lodash";
import {ParkingLotService} from "../../services/parkingLot/parking-lot.service";
import {ParkingLot} from "../../model/ParkingLot/parking-lot";

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {


  parkingLotData: ParkingLot;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'ownersId', 'spaceAvailable', 'spaceFree','cost', 'actions'];

  @ViewChild('parkingLotForm', {static: false})
  parkingLotForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private parkingLotService: ParkingLotService) {
    this.parkingLotData = {} as ParkingLot;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllparkingLot();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllparkingLot() {
    this.parkingLotService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: ParkingLot) {
    this.parkingLotData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.parkingLotForm.resetForm();
  }

  deleteItem(id: number) {
    this.parkingLotService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Owner) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
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
          .map((o: ParkingLot) => {
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
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
