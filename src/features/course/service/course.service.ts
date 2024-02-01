import { Injectable } from '@angular/core';
import { Course } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    courses: Course[] = [
        {
            id: 1,
            name: 'Curso de Angular avanzado',
            description: 'En este curso veras a fondo el framework de Angular',
            dateFrom: new Date().setFullYear(2024, 2, 1),
            dateTo: new Date().setFullYear(2024, 11, 30),
        },
        {
            id: 2,
            name: 'Curso de React',
            description: 'Aprende a construir aplicaciones web con React',
            dateFrom: new Date().setFullYear(2024, 5, 1),
            dateTo: new Date().setFullYear(2024, 8, 30),
        },
        {
            id: 3,
            name: 'Curso de Vue.js',
            description: 'Descubre el poder de Vue.js en el desarrollo web',
            dateFrom: new Date().setFullYear(2024, 9, 1),
            dateTo: new Date().setFullYear(2024, 11, 31),
        },
        {
            id: 4,
            name: 'Curso de Python',
            description: 'Aprende a programar en Python desde cero',
            dateFrom: new Date().setFullYear(2024, 3, 1),
            dateTo: new Date().setFullYear(2024, 6, 30),
        }
    ];

    getCourses(): Course[] {
        return this.courses;
    }
}
