import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { IProduct } from '../../../interfaces';
import { ProductsManagementService } from '../../../services/products-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};
  public service: ProductsManagementService = inject(ProductsManagementService);

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.service.updateProduct(item);
  }

  deleteProduct(item: IProduct) {
    this.service.deleteProduct(item);
  }
}