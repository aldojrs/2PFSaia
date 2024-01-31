import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../features/student/student.component';

const routes: Routes = [
    { path: 'student', loadChildren: () => import('../features/student/student.module').then(m => m.StudentModule) },
    { path: 'course', loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule) },
    { path: 'enrollment', loadChildren: () => import('../features/enrollment/enrollment.module').then(m => m.EnrollmentModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }