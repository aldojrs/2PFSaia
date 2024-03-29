import { Component } from '@angular/core';
import { Course } from './models';
import { CourseService } from './service/course.service';
import { LoadingService } from '../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseDetailComponent } from './dialogs/course-detail/course-detail.component';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CourseFormComponent } from './dialogs/course-form/course-form.component';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
})
export class CourseComponent {

    displayedColumns: string[] = ['id', 'name', 'description', 'dateFrom', 'dateTo', 'actions'];
    dataSource!: Course[];

    constructor(private courseService: CourseService, private loadingService: LoadingService,
        private dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadingService.setIsLoading(true);
        this.courseService.getCourses().subscribe((courses) => {
            this.dataSource = [...courses];
            this.loadingService.setIsLoading(false);
        });
    }

    openCourseDetail(course?: Course) {
        this.dialog.open(CourseDetailComponent, {
            data: course,
        });
    }

    openCourseForm(course?: Course) {
        const dialogRef = this.dialog.open(CourseFormComponent, {
            data: course,
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            this.loadingService.setIsLoading(true);

            if (course) { // If the course is not null, it means that we are editing an existing student
                const courseEdited = { ...course, ...result };
                this.courseService.editCourse(courseEdited).subscribe((courses) => {
                    this.dataSource = courses;
                    this.loadingService.setIsLoading(false)
                    this._snackBar.open('Curso actualizado correctamente', 'Ok', { duration: 3000 });
                });
            } else { // If the course is null, it means that we are creating a new course
                this.courseService.addCourse(result).subscribe((courses) => {
                    this.dataSource = courses;
                    this.loadingService.setIsLoading(false)
                    this._snackBar.open('Curso agregado correctamente', 'Ok', { duration: 3000 });
                });
            }
        });
    }

    deleteCourse(course: Course) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el curso?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (!confirmed) return;
            this.loadingService.setIsLoading(true);
            this.courseService.deleteCourse(course.id).subscribe((result) => {
                this.dataSource = result;
                this.loadingService.setIsLoading(false)
                this._snackBar.open('Curso eliminado correctamente', 'Ok', { duration: 3000 });
            });
        });
    }

}
