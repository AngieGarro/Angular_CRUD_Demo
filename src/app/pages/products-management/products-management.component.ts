import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { IProduct } from '../../interfaces';
import { ProductsManagementService } from '../../services/products-management.service';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    ProductListComponent,
    LoaderComponent,
    ProductFormComponent,
    ModalComponent
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss'
})
export class ProductsManagementComponent {
  public itemList: IProduct[] = [];
  public service: ProductsManagementService = inject(ProductsManagementService);

  constructor() {
    this.service.getAll();
  }

  handleFormAction(product: IProduct) {
    this.service.addProduct(product);
  }
}
