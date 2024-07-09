import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ICategory, IFeedBackMessage, IFeedbackStatus, IProduct } from '../../../interfaces';
import { ProductsManagementService } from '../../../services/products-management.service';
import { CategoriesManagementService } from '../../../services/categories-management.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct = {};
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  public categoryService: CategoriesManagementService = inject(CategoriesManagementService);
  public categories: ICategory[] = [];

  callEvent() {
    this.callParentEvent.emit(this.product);
  }

  ngOnInit() {
    this.loadCategory()
  }

  loadCategory(){
    this.categoryService.getAllSignal()
    this.categories = this.categoryService.items$()
  }
}
