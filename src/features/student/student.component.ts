import { Component, OnInit } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { StudentService } from '../../core/services/student.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    displayedColumns: string[] = ['id', 'fullName', 'documentNro', 'email', 'registrationDate', 'actions'];
    dataSource!: Student[];

    constructor(public studentService: StudentService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.dataSource = this.studentService.getStudents();
    }

    deleteStudent(student: Student) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el estudiante?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.studentService.deleteStudent(student.id);
                this.dataSource = this.studentService.getStudents();
                this._snackBar.open('Estudiante eliminado correctamente', 'Ok', { duration: 3000 });
            }
        });
    }

    openStudentForm(student?: Student) {
        const dialogRef = this.dialog.open(StudentFormComponent, {
            data: student,
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            try {
                if (student) { // If the student is not null, it means that we are editing an existing student
                    const studentEdited = { ...student, ...result };
                    this.studentService.editStudent(studentEdited);
                    this._snackBar.open('Estudiante actualizado correctamente', 'Ok', { duration: 3000 });
                } else { // If the student is null, it means that we are creating a new student
                    this.studentService.addStudent(result);
                    this._snackBar.open('Estudiante agregado correctamente', 'Ok', { duration: 3000 });
                }

                this.dataSource = this.studentService.getStudents();
            } catch (error: any) {
                this._snackBar.open(error, 'Ok', { duration: 3000 });
            }
        });
    }

}
