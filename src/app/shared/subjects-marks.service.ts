import { Injectable } from '@angular/core';
import { Mark } from '../models/mark';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class SubjectsMarksService {

  avgMark: number;
  student: Student[];
  teacher: Teacher[];

  private url = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public getAvgGrade(student_id: number): Observable<Object> {
    return this.http.get(`${this.url}/grades?student_id=${student_id}`);
  }

  public getEnrollmentInfo(student_id: number): Observable<Object> {
    return this.http.get(`${this.url}/enrollment_info?student_id=${student_id}`);
  }

  public getAllEnrollmentInfo(): Observable<Object> {
    return this.http.get(`${this.url}/enrollment_info`);
  }

  public getSubjectsTaught(teacher_id: number): Observable<Object> {
    return this.http.get(`${this.url}/subjects_taught?teacher_id=${teacher_id}`);
  }

  public getAllSubjectsTaught(): Observable<Object> {
    return this.http.get(`${this.url}/subjects_taught`);
  }

}
