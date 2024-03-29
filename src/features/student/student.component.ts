import { Component, OnInit } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { StudentService } from './service/student.service';
import { StudentDetailComponent } from './dialogs/student-detail/student-detail.component';
import { LoadingService } from '../../core/services/loading.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    displayedColumns: string[] = ['id', 'fullName', 'documentNro', 'email', 'registrationDate', 'actions'];
    dataSource!: Student[];

    constructor(private studentService: StudentService, private loadingService: LoadingService, 
        private dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.loadingService.setIsLoading(true);
        this.studentService.getStudents().subscribe((students) => {
            this.dataSource = [...students];
            this.loadingService.setIsLoading(false);
        });
    }

    openStudentDetail(student?: Student) {
        this.dialog.open(StudentDetailComponent, {
            data: student,
        });
    }

    openStudentForm(student?: Student) {
        const dialogRef = this.dialog.open(StudentFormComponent, {
            data: student,
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            this.loadingService.setIsLoading(true);

            if (student) { // If the student is not null, it means that we are editing an existing student
                const studentEdited = { ...student, ...result };
                this.studentService.editStudent(studentEdited).subscribe({
                    next: (result) => {
                        this.dataSource = result;
                        this.loadingService.setIsLoading(false);
                        this._snackBar.open('Alumno actualizado correctamente', 'Ok', { duration: 3000 });
                    },
                    error: (error) => {
                        this._snackBar.open(error, 'Ok', { duration: 3000 });
                        this.loadingService.setIsLoading(false);
                    }
                });
            } else { // If the student is null, it means that we are creating a new student
                this.studentService.addStudent(result).subscribe({
                    next: (result) => {
                        this.dataSource = result;
                        this.loadingService.setIsLoading(false)
                        this._snackBar.open('Alumno agregado correctamente', 'Ok', { duration: 3000 });
                    },
                    error: (error) => {
                        this._snackBar.open(error, 'Ok', { duration: 3000 });
                        this.loadingService.setIsLoading(false);
                    }
                });
            }
        });
    }

    deleteStudent(student: Student) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el alumno?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.loadingService.setIsLoading(true);
                this.studentService.deleteStudent(student.id).subscribe((result) => {
                    this.dataSource = result;
                    this.loadingService.setIsLoading(false)
                    this._snackBar.open('Alumno eliminado correctamente', 'Ok', { duration: 3000 });
                });
            }
        });
    }

}
