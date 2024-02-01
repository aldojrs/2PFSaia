import { Injectable } from '@angular/core';
import { Enrollment } from '../models';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    enrollments: Enrollment[] = [];

    addEnrollment(studentId: number, courseId: number): void {
        this.enrollments.push({
            id: this.getUniqueId(),
            studentId,
            courseId,
            date: Date.now()
        });
    }

    private getUniqueId(): number {
        const maxId = Math.max(...this.enrollments.map(s => s.id));
        return maxId + 1;
    }

}
