import { Component, inject, OnInit } from '@angular/core';
import { CategoriesListComponent } from '../../components/categories/categories-list/categories-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriesFormComponent } from "../../components/categories/categories-form/categories-form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoriesManagementService } from '../../services/categories-management.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategory } from '../../interfaces';


@Component({
    selector: 'app-categories-management',
    standalone: true,
    templateUrl: './categories-management.component.html',
    styleUrl: './categories-management.component.scss',
    imports: [
        CategoriesListComponent,
        LoaderComponent,
        CategoriesFormComponent,
        ModalComponent
    ]
})
export class CategoriesManagementComponent {

}
