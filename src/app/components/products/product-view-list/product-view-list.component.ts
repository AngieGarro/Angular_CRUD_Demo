import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { ProductsManagementService } from '../../../services/products-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductViewListComponent
  ],
  templateUrl: './product-view-list.component.html',
  styleUrl: './product-view-list.component.scss'
})
export class ProductViewListComponent implements OnChanges{
  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};
  @Input() areActionsAvailable: boolean = false;
  public service: ProductsManagementService = inject(ProductsManagementService);


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  constructor() {
    this.service.getAllSignal();
    effect(() => {      
      this.itemList = this.service.items$();
    });
  }
}


