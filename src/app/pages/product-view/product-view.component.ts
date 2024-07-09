import { Component, inject } from '@angular/core';
import { ProductViewListComponent } from '../../components/products/product-view-list/product-view-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IProduct } from '../../interfaces';
import { ProductsManagementService } from '../../services/products-management.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    ProductViewListComponent,
    LoaderComponent
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  public itemList: IProduct[] = [];
  public service: ProductsManagementService = inject(ProductsManagementService);

  constructor() {
    this.service.getAll();
  }

}
