import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';

import {OwnerService} from "../../services/owner/owner.service";
import {Owner} from "../../model/owner/owner";
import * as Console from "console";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  ownerData: Owner;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nameCompany', 'address', 'description','contact','ownerType', 'actions'];

  @ViewChild('ownerForm', {static: false})
  ownerForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private ownerService: OwnerService) {
    this.ownerData = {} as Owner;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllOwner();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllOwner() {
    this.ownerService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Owner) {
    this.ownerData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.ownerForm.resetForm();
  }

  deleteItem(id: number) {
    this.ownerService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Owner) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addOwner() {
    this.ownerData.id = 0;
    this.ownerService.create(this.ownerData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateOwner() {
    this.ownerService.update(this.ownerData.id, this.ownerData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((o: Owner) => {
            if (o.id === response.id) {
              o = response;
            }
            return o;
          });
      });
  }

  onSubmit() {
    if (this.ownerForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log(' about to update');
        this.updateOwner();
      } else {
        console.log('about to add');
        this.addOwner();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
