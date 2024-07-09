import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ICategory, IFeedBackMessage, IFeedbackStatus } from '../../../interfaces';
import { CategoriesManagementService } from '../../../services/categories-management.service';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss'
})
export class CategoriesFormComponent {
  @Input() title!: string;
  @Input() category: ICategory =  {
    name: '',
    description: ''
  };
  @Input() action: string = 'add'
 
  service = inject(CategoriesManagementService);
  feedbackMessage: IFeedBackMessage = {type: IFeedbackStatus.default, message: ''};

  handleAction (form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[ this.action == 'add' ? 'save': 'update'](this.category).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `Category successfully ${this.action == 'add' ? 'added': 'updated'}`
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        }
      })
    }
  }
}


