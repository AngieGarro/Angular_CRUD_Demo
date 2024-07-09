import { CategoriesManagementService } from './../../../services/categories-management.service';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { ICategory } from '../../../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoriesFormComponent
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnChanges {
  public search: String = '';
  public itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  private service = inject(CategoriesManagementService);
  private snackBar = inject(MatSnackBar);
  public currentCategory: ICategory = {
    name: '',
    description: ''
  };
  
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

  showDetailModal(category: ICategory, modal: any) {
    this.currentCategory = {...category}; 
    modal.show();
  }

  deleteCategory(item: ICategory) {
    this.service.delete(item);
  }
}
