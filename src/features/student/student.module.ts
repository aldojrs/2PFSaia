import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule,
  ],
})
export class StudentModule { }
