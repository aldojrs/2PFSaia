import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, delay, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    students: Student[] = [
        {
            id: 1,
            firstName: 'Juan',
            lastName: 'Perez',
            documentNro: 12345678,
            email: 'jp@mail.com',
            registrationDate: new Date().setFullYear(2023, 5, 12),
        },
        {
            id: 2,
            firstName: 'José',
            lastName: 'Gomez',
            documentNro: 87344321,
            email: 'jg@mail.com',
            registrationDate: new Date().setFullYear(2023, 0, 10),
        },
        {
            id: 3,
            firstName: 'Maria',
            lastName: 'Gonzalez',
            documentNro: 12345658,
            email: 'mg@mail.com',
            registrationDate: new Date().setFullYear(2023, 2, 25),
        },
        {
            id: 4,
            firstName: 'Lucia',
            lastName: 'Moreno',
            documentNro: 87654321,
            email: 'lm@mail.com',
            registrationDate: new Date().setFullYear(2023, 8, 8),
        },
        {
            id: 5,
            firstName: 'Diego',
            lastName: 'Maradona',
            documentNro: 12392678,
            email: 'diego@mail.com',
            registrationDate: new Date().setFullYear(2023, 4, 30),
        },
        {
            id: 6,
            firstName: 'Lionel',
            lastName: 'Messi',
            documentNro: 87659521,
            email: 'lionel@mail.com',
            registrationDate: new Date().setFullYear(2023, 6, 24),
        },
    ];

    getStudents(): Observable<Student[]> {
        return of(this.students).pipe(delay(1000));
    }

    addStudent(student: Student): Observable<Student[]> {
        const existingStudent = this.students.find(s => s.documentNro === student.documentNro);
        if (existingStudent) {
            const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
            return throwError(() => err);
        }

        student.id = this.getUniqueId();
        student.registrationDate = Date.now();
        this.students = [...this.students, student];

        return this.getStudents();
    }

    private getUniqueId(): number {
        const maxId = Math.max(...this.students.map(s => s.id));
        return maxId + 1;
    }

    editStudent(student: Student): Observable<Student[]> {
        const existingStudent = this.students.find(s => s.documentNro === student.documentNro);
        if (existingStudent && existingStudent.id !== student.id) {
            const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
            return throwError(() => err);
        }

        this.students = this.students.filter(s => s.id !== student.id);
        this.students = [...this.students, student];
        this.students.sort((a, b) => a.id - b.id);

        return this.getStudents();
    }

    deleteStudent(studentId: number): Observable<Student[]> {
        this.students = this.students.filter(s => s.id !== studentId);
        return this.getStudents();
    }

}
