import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models';
import { Course } from '../../../course/models';
import { CourseService } from '../../../course/service/course.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'description', 'dateFrom', 'dateTo', 'actions'];
    dataSource!: Course[];

    constructor(private courseService: CourseService, @Inject(MAT_DIALOG_DATA) public student: Student) {}

    ngOnInit(): void {
        // ACA TENGO QUE IR A BUSCAR LOS CURSOS A LOS CUALES EL ESTUDIANTE ESTA INSCRIPTO
        this.dataSource = this.courseService.getCourses();
    }

}
