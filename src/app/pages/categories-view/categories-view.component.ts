import { Component } from '@angular/core';
import { CategoriesViewListComponent } from '../../components/categories/categories-view-list/categories-view-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-categories-view',
  standalone: true,
  imports: [
    CategoriesViewListComponent,
    LoaderComponent
  ],
  templateUrl: './categories-view.component.html',
  styleUrl: './categories-view.component.scss'
})
export class CategoriesViewComponent {

}
