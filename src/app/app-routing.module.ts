import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { SubjectsMarksComponent } from './pages/subjects-marks/subjects-marks.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "students", component: StudentsComponent},
  {path: "subjects_marks", component: SubjectsMarksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
