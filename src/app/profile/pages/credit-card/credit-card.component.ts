import {Component, OnInit, ViewChild} from '@angular/core';
import {ParkingLot} from "../../../parkingLot/model/ParkingLot/parking-lot";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ParkingLotService} from "../../../parkingLot/services/parkingLot/parking-lot.service";
import * as _ from "lodash";
import {Owner} from "../../../parkingLot/model/owner/owner";
import {CreditCard} from "../../model/credit-card";
import {CreditCardService} from "../../services/credit-card.service";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  creditCardData: CreditCard;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'type', 'number', 'dateExpiration','cvi', 'actions'];

  @ViewChild('creditCardForm', {static: false})
  creditCardForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private creditCardService: CreditCardService) {
    this.creditCardData = {} as CreditCard;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCreditCard();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllCreditCard() {
    this.creditCardService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: CreditCard) {
    this.creditCardData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.creditCardForm.resetForm();
  }

  deleteItem(id: number) {
    this.creditCardService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Owner) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addCreditCard() {
    this.creditCardData.id = 0;
    this.creditCardService.create(this.creditCardData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateCreditCard() {
    this.creditCardService.update(this.creditCardData.id, this.creditCardData)
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
    if (this.creditCardForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateCreditCard();
      } else {
        console.log('about to add');
        this.addCreditCard();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
