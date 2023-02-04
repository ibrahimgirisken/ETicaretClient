import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
  ];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.LineScalePulseOut);
    const allProducts: List_Product[] = await this.productService.read(
      () => this.hideSpinner(SpinnerType.LineScalePulseOut),
      (errorMessage) =>
        this.alertifyService.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        })
    );
    this.dataSource = new MatTableDataSource<List_Product>(allProducts);
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {
     await this.getProducts();
  }
}
