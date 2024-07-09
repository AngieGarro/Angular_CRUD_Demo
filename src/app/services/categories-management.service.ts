import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService extends BaseService<ICategory> {
  protected override source: string = 'categories';
  private itemsListSignal = signal<ICategory[]>([]);
  
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get items$ () {
    return this.itemsListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemsListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching categories', error);
      }
    });
  }

  save(category: ICategory): Observable<any>{
    return this.add(category).pipe(
      tap((response: any) => {
        this.itemsListSignal.update( categories => [response, ...categories]);
      }),
      catchError(error => {
        console.error('Error saving category', error);
        return throwError(error);
      })
    );
  }

  update(category: ICategory): Observable<any>{
    return this.edit(category.id, category).pipe(
      tap((response: any) => {
        const updated = this.itemsListSignal().map(u => u.id === category.id ? response : u);
        this.itemsListSignal.set(updated);
      }),
      catchError(error => {
        console.error('Error updating category', error);
        return throwError(error);
      })
    );
  }

  public delete(item: ICategory) {
    this.del(item.id).subscribe({
      next: () => {
        this.itemsListSignal.set(this.itemsListSignal().filter(category => category.id != item.id));
      },
    })
  }
}
