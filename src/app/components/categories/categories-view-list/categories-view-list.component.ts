import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { CategoriesManagementService } from '../../../services/categories-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-view-list',
  standalone: true,
  imports: [],
  templateUrl: './categories-view-list.component.html',
  styleUrl: './categories-view-list.component.scss'
})
export class CategoriesViewListComponent implements OnChanges{
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
}
